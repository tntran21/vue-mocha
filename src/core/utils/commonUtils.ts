class CommonUtils {
  /**
   * Determines whether a given value is null, undefined, or NaN.
   *
   * @param {number | null | undefined} val - The value to check.
   * @return {boolean} True if the value is null, undefined, or NaN; otherwise, false.
   */
  public static isNaNOrNull(val: number | null | undefined): boolean {
    return val == null || Number.isNaN(val);
  }
}

export default CommonUtils;
