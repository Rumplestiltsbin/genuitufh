module.exports = function (eleventyConfig) {
  // Passthrough copy (if you add a css folder later)
  eleventyConfig.addPassthroughCopy("css");

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
