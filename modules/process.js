async function runProcess(args) {
  if ('-g' in args) {
    return 0;
  }
  switch (args.length) {
    case 1:
    case 2:
    default:
      process.stdout('Usage: snippets <infile> <name>');
      process.stdout('Usage: snippets <infile>');
  }
  return 1;
}

module.exports = runProcess;
