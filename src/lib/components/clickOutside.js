/**
 * @param {HTMLElement} element
 * @param {CallableFunction} callbackFunction
 */
export function clickOutside(element, callbackFunction) {
  /**
   * @param {MouseEvent} event
   */
  function onClick(event) {
    if (event.target && !element.contains(/** @type {Node} */ (event.target))) {
      callbackFunction();
    }
  }

  document.body.addEventListener("click", onClick);

  return {
    /**
     * @param {CallableFunction} newCallbackFunction
     */
    update(newCallbackFunction) {
      callbackFunction = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener("click", onClick);
    },
  };
}
