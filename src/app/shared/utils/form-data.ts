export function createFormDataParams(data: { [key: string]: any }, fileKey = ''): FormData {
  const params = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];
    const isFile = key === fileKey && data[key] && typeof data[key] === 'object';
    isFile ? params.append(key, value, value.name) : params.append(key, value);
  });

  return params;
}


export function removeFromStringTags(str): any {
  if((str === null) || (str === '')) {
    return false;
  } else {
    str = str.toString();
  }

  let text = str.replace( /(<([^>]+)>)/ig, ' ');
  text = text.split(' ');
  text = text.filter((item) =>  item);
  text = text.join(' ');
  return text;
}
