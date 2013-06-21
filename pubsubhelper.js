var PubSubHelper = function () {
    /// <summary> Helper class which returns a pub/sub blueprint </summary>
    this.subscribers = [];
};

PubSubHelper.prototype = {
    subscribe: function (subscribeFn) {
        /// <summary> function to be executed when notify is triggered</summary>
        /// <param name="subscribeFn" type="Function"> Function to be fired </param>
        /// <returns type="Array"> Returns an array containing all functions subscribed</returns>

        if (typeof subscribeFn !== "function") {
            throw new Error("Parameter passed is not a function");
        }

        this.subscribers.push(subscribeFn);

        return this.subscribers;
    },
    unsubscribe: function (unsubscribeFn) {
        /// <summary> unsubscribe function from being notified</summary>
        /// <param name="unsubscribeFn" type="Function"> Function to be removed</param>
        /// <returns type="Array"> Returns an array containing all functions subscribed</returns>


        if (typeof unsubscribeFn !== "function") {
            throw new Error("Parameter passed is not a function");
        }

        var subscribers = this.subscribers,
			i = 0,
			len = subscribers.length;

        // remove fn item from array if it matches the unsubscribeFn
		for( ; i < len; i++) {
		
			if (subscribers[i] === unsubscribeFn) {
				subscribers.splice(i, 1);
				break;
			}
			
		}

        return subscribers;
    },
    notify: function () {
        /// <summary>
        /// Executes all subscribers. Optional parameters can be passed to be passed for all subscribers.
        /// </summary>
		
        var args = Array.prototype.slice.call(arguments),
            subscribers = this.subscribers,
            len = subscribers.length,
			i = 0;

        for ( ; i < len; i++) {
            subscribers[i](args);
        }
    }
};