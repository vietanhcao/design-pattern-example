//Class decorator
function log(constructor: any) {
	return function (...args: any[]) {
		console.log(`New ${constructor.name}`);
		console.log(...args);
		return new constructor(...args);
	} as typeof constructor;
}

@log
class Yogurt {
	flavor: string;
	constructor(flavor: string) {
		this.flavor = flavor;
	}
}

new Yogurt("strawberry");
new Yogurt("cherry");

// class Method decorators
function excludeProperties(propertiesToExclude: string[]) {
	return (
		target: any,
		propertyName: string,
		descriptor: PropertyDescriptor
	) => {
		const originalFunction = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			const originResult = await originalFunction.apply(this, args);
			propertiesToExclude.forEach((prop) => delete originResult[prop]);
			return originResult;
		};
	};
}

// class UserService {
// 	private user = userModel;

// 	@excludeProperties(["password"])
// 	private getUser = async (userId: string) => {
// 		const user = await this.user.findById(userId);
// 		if (user) {
// 			return user;
// 		}
// 		throw new UserNotFoundException(userId);
// 	};
// }

// class Property decorators

function logP(target: any, propertyName: string) {
	// console.log(target);
	console.log(`The property ${propertyName} added to the class`);
}

class YogurtP {
	@logP
	public flavor: string;
	constructor(flavor: string) {
		this.flavor = flavor;
	}
}

new YogurtP("Property decorators strawberry");

// class Accessor decorators

function enumerable(isEnumerable: boolean) {
	return function (
		target: any,
		propertyName: string,
		descriptor: PropertyDescriptor
	) {
		descriptor.enumerable = isEnumerable;
	};
}

class TranslationsService {
	private currentLanguage: string;
	previousLanguages: string[] = [];

	@enumerable(false)
	get language() {
		return this.currentLanguage;
	}
	set language(newLanguage: string) {
		if (this.currentLanguage) {
			this.previousLanguages.push(this.currentLanguage);
		}
		this.currentLanguage = newLanguage;
	}
}

const translationsService = new TranslationsService();
translationsService.language = "en";
console.log(translationsService.language);
console.log(translationsService.previousLanguages);

// Parameter decorators

function logPa(target: any, parameterName: string, parameterIndex: number) {
	console.log(`Added a parameter number ${parameterIndex}`);
}

class YogurtPa {
	public flavor: string;
	constructor(@logPa flavor: string) {
		this.flavor = flavor;
	}
}

new YogurtPa("Parameter decorators strawberry");

// method decorators dep

function deco1() {
	console.log("deco1(): evaluated");
	return function (
		target,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		console.log("deco1(): called");
		descriptor.value = async function (...args: any[]) {
			return 1;
		};
	};
}

function deco2() {
	console.log("deco2(): evaluated");
	return function (
		target,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		console.log("deco2(): called");
		descriptor.value = async function (...args: any[]) {
			return 2;
		};
	};
}

class C {
	@deco1()
	@deco2()
	method() {}
}
// ********************************

// abstract class Car {
// 	public description: string;

// 	public getDescription(): string {
// 		return this.description;
// 	}

// 	public abstract cost(): number;
// }

// class ModelS extends Car {
// 	public description = "Model S";
// 	public cost(): number {
// 		return 73000;
// 	}
// }

// class ModelX extends Car {
// 	public description = "Model X";
// 	public cost(): number {
// 		return 77000;
// 	}
// }

// abstract class CarOptions extends Car {
// 	decoratedCar: Car;

// 	public abstract getDescription(): string;

// 	public abstract cost(): number;
// }

// class EnhancedAutoPilot extends CarOptions {
// 	decoratedCar: Car;

// 	constructor(car: Car) {
// 		super();
// 		this.decoratedCar = car;
// 	}

// 	public getDescription(): string {
// 		return this.decoratedCar.getDescription() + ", Enhanced AutoPilot";
// 	}
// 	public cost(): number {
// 		return this.decoratedCar.cost() + 5000;
// 	}
// }

// class RearFacingSeats extends CarOptions {
//   decoratedCar: Car;

//   constructor(car: Car) {
//     super();
//     this.decoratedCar = car;
//   }

//   public getDescription(): string {
//     return this.decoratedCar.getDescription() + ", RearFacingSeats";
//   }
//   public cost(): number {
//     return this.decoratedCar.cost() + 4000;
//   }
// }

// let myTesla = new ModelS();

// myTesla = new RearFacingSeats(myTesla);
// myTesla = new EnhancedAutoPilot(myTesla);


// console.log(myTesla.cost());
// console.log(myTesla.getDescription());