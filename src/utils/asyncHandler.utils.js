/**
 * Wrapper function to handle async controllers and services
 * Eliminates the need for try/catch blocks in every handler
 * @param {Function} fn - The async controller/service function to wrap
 * @returns {Function} - Express middleware function with error handling
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
