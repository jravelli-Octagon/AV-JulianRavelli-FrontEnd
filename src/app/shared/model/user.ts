import { Profile } from './profile';

export class User {
	id: number;
	userName: string;
	email: string;
	profiles: Array<Profile> = new Array<Profile>();
	currentState: string;
	type: string;
	isActive: boolean;

	constructor(user) {
		if (user != null) {
			this.id = user.id;
			this.userName = user.username;
			this.email = user.email;
			this.currentState = user.currentState;
			this.type = user.type;
			this.isActive = user.isActive;
			
			if (user.profiles != null) {
				user.profiles.forEach(obj => {
					this.profiles.push(new Profile(obj));
				});
			}
		}
	}

	addProfile(profile) {
		this.profiles.push(profile);
	}

	setUsername(userName) {
		this.userName = userName;
	}

	removeProfile(profile) {
		this.profiles.splice(this.profiles.indexOf(profile), 1);
	}

	getCurrentState() {
		return this.currentState;
	}
}
