// @ts-expect-error
document.createRange = function () {
    throw new Error("STUB");
};
