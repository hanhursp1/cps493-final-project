
/**
 * @template T
 * @typedef {import('../../client/src/model/transporttypes').DataEnvelope} DataEnvelope<T>
 */

/**
 * @template T
 * @param {T} result 
 * @returns {DataEnvelope<T>}
 */
function makeResponse(result) {
  return {
    data: result,
    isSuccess: result != undefined
  }
}

module.exports = {
  makeResponse
}