// facade pattern
class Bed {
	makeTheBed() {
		console.log("The Bed is ready");
	}
}

class AirFreshener {
	spray() {
		console.log("A nice smell spreads through the air");
	}
}

class TrashCan {
	takeOutTrash() {
		console.log("The trash is taken out");
	}
}

class Dishwasher {
	fill() {
		console.log(" the dishwasher is filled");
	}
	wash() {
		console.log("The dishwasher is washing");
		return new Promise(function (resolve, reject) {
			resolve("");
		});
	}
	empty() {
		console.log("The dishwasher is empty");
	}
}

class HouseCleaningFacade {
	private readonly bed: Bed;
	private readonly trashCan: TrashCan;
	private readonly airFreshener: AirFreshener;
	private readonly dishwasher: Dishwasher;
	constructor(
		bed: Bed,
		trashCan: TrashCan,
		airFreshener: AirFreshener,
		dishwasher: Dishwasher
	) {
		this.bed = bed;
		this.trashCan = trashCan;
		this.airFreshener = airFreshener;
		this.dishwasher = dishwasher;
	}

	public cleanTheHouse() {
		this.bed.makeTheBed();
		this.trashCan.takeOutTrash();
		this.airFreshener.spray();

		this.dishwasher.fill();
		this.dishwasher.wash().then(this.dishwasher.empty);
	}
}

const houseCleaning = new HouseCleaningFacade(
	new Bed(),
	new TrashCan(),
	new AirFreshener(),
	new Dishwasher()
);
houseCleaning.cleanTheHouse();

class API {
	readonly authToken: string;
	constructor(authToken: string) {
		this.authToken = authToken;
	}

	construcHeaders() {
		const headers = new Headers();
		headers.set("Authorization", this.authToken);
		return headers;
	}

	handleResponse(response: Response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject({
				status: response.status,
				statusText: response.statusText,
			});
		}
	}
	async get(url: string, options?: any) {
		return fetch(url, {
			method: "GET",
			headers: this.construcHeaders(),
			...options,
		})
			.then(this.handleResponse)
			.catch((err) => {
				console.log(err);
			});
	}
}

const api = new API("my-ayth-token");

api
	.get("https://api.github.com/users/octocat")
	.then((data) => console.log(data))
	.catch((err) => console.log(err));




