class StringHelper {
  stripWhitespace = (inputString: string): string => {
    return inputString.replace(/\s+/g, '');
  };
}

export const stringHelper = new StringHelper();
