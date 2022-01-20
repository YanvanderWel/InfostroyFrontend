const USERNAME = "username"

export const getName = () => {
	return window.localStorage.getItem(USERNAME);
};

export const saveName = name => {
	window.localStorage.setItem(USERNAME, name);
};

export const removeName = () => {
	window.localStorage.removeItem(USERNAME);
};

export default { getName, saveName, removeName };