module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSouce: "nativewindd" }],
            "nativewind/babel"
        ]
    };
};
