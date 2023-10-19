var createScream = function(logger) {
    return function (message) {
        logger(message.toUpperCase() + "!!!")
    }
}
export const scream = createScream(message => console.log(message));

const createScream2 = logger => message =>
    logger(message.toUpperCase() + "!!!")

export const scream2 = createScream2(message => console.log(message));