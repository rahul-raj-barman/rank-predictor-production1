use wasm_bindgen::prelude::*;

const SQRT_2: f64 = 1.414_213_562_373_095_1;

/// Abramowitz and Stegun 7.1.26 approximation.
///
/// Maximum error is about 1.5e-7, which is more than enough for rank prediction
/// while keeping the Wasm binary small and dependency-free.
fn erf(x: f64) -> f64 {
    let sign = if x < 0.0 { -1.0 } else { 1.0 };
    let x = x.abs();
    let t = 1.0 / (1.0 + 0.327_591_1 * x);

    let polynomial =
        (((((1.061_405_429 * t - 1.453_152_027) * t) + 1.421_413_741) * t - 0.284_496_736) * t
            + 0.254_829_592)
            * t;

    sign * (1.0 - polynomial * (-x * x).exp())
}

fn normal_cdf(score: f64, mean: f64, std_dev: f64) -> f64 {
    let z = (score - mean) / std_dev;
    0.5 * (1.0 + erf(z / SQRT_2))
}

fn finite_positive(value: f64) -> bool {
    value.is_finite() && value > 0.0
}

/// Calculates an expected all-India style rank from a score distribution.
///
/// The model assumes scores are approximately normally distributed:
/// rank ~= round((1 - CDF(score)) * total_candidates + 1)
///
/// Invalid inputs return rank 1 rather than propagating NaN/Infinity into JS.
#[wasm_bindgen]
pub fn calculate_expected_rank(score: f64, mean: f64, std_dev: f64, total_candidates: f64) -> f64 {
    if !score.is_finite()
        || !mean.is_finite()
        || !finite_positive(std_dev)
        || !finite_positive(total_candidates)
    {
        return 1.0;
    }

    let candidate_count = total_candidates.round().max(1.0);
    let cdf = normal_cdf(score, mean, std_dev).clamp(0.0, 1.0);
    let candidates_ahead = (1.0 - cdf) * candidate_count;
    let expected_rank = (candidates_ahead + 1.0).round();

    expected_rank.clamp(1.0, candidate_count)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn high_score_stays_at_rank_one_or_better_bound() {
        let rank = calculate_expected_rank(100.0, 50.0, 10.0, 100_000.0);
        assert_eq!(rank, 1.0);
    }

    #[test]
    fn mean_score_is_approximately_middle_rank() {
        let rank = calculate_expected_rank(50.0, 50.0, 10.0, 100_000.0);
        assert_eq!(rank, 50_001.0);
    }

    #[test]
    fn invalid_inputs_return_minimum_rank() {
        assert_eq!(
            calculate_expected_rank(f64::NAN, 50.0, 10.0, 100_000.0),
            1.0
        );
        assert_eq!(calculate_expected_rank(60.0, 50.0, 0.0, 100_000.0), 1.0);
        assert_eq!(calculate_expected_rank(60.0, 50.0, 10.0, -1.0), 1.0);
    }

    #[test]
    fn rank_never_exceeds_candidate_count() {
        let rank = calculate_expected_rank(-1_000.0, 50.0, 10.0, 1_000.0);
        assert_eq!(rank, 1_000.0);
    }
}
