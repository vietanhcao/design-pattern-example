/**  SOLID principles */

//> single responsibility principle

class StatisticsBad {
	public computeSalesStatistics() {}

	public generateReport() {}
}

// should be split into two classes

class Statistics {
	public computeSalesStatistics() {
		// ...
	}
}

class ReportGenerator {
	public generateReport() {
		// ...
	}
}

//> Open-closed principle
/**
 * Nguyên tắc này nói rằng `các thực thể phần mềm (class, module, function, v.v.) phải mở để mở rộng, nhưng đóng để sửa đổi có nghĩa là bạn có thể mở rộng hành vi của class mà không cần sửa đổi nó.
 */

class RectangleBad {
	constructor(public width: number, public height: number) {
		this.height = height;
		this.width = width;
	}
}

class CircleBad {
	constructor(public radius: number) {
		this.radius = radius;
	}
}

function calculateAreasOfMultipleShapesBad(
	shapes: Array<RectangleBad | CircleBad>
) {
	return shapes.reduce((calculatedArea, shape) => {
		if (shape instanceof RectangleBad) {
			return calculatedArea + shape.width * shape.height;
		}
		if (shape instanceof CircleBad) {
			return calculatedArea + shape.radius * Math.PI;
		}
		return 0;
	}, 0);
}

// when we introduce a new shape, we need to modify our  calculateAreasOfMultipleShapes function
// fix this

interface Shape {
	getArea(): number;
}

class Rectangle implements Shape {
	constructor(public width: number, public height: number) {
		this.height = height;
		this.width = width;
	}

	getArea() {
		return this.width * this.height;
	}
}
class Circle implements Shape {
	constructor(public radius: number) {
		this.radius = radius;
	}

	getArea() {
		return this.radius * Math.PI;
	}
}

function calculateAreasOfMultipleShapes(shapes: Shape[]) {
	return shapes.reduce((calculatedArea, shape) => {
		return calculatedArea + shape.getArea();
	}, 0);
}

//> Liskov substitution principle

/**
 * Các lớp con hoặc lớp con phải được thay thế cho các lớp cơ sở hoặc lớp cha của chúng. Nguyên tắc này đảm bảo rằng bất kỳ lớp nào là con của lớp cha đều có thể sử dụng được thay cho lớp cha của nó mà không có bất kỳ khó khăn nào.
 */

class Employee {
	public permissions: any = new Set<string>();

	// public hasPermission(permissionName: string) {
	// 	return this.permissions.has(permissionName);
	// }
	public addPermission(permissionName: string) {
		return this.permissions.add(permissionName);
	}
}
class Cashier extends Employee {
	// protected permissions: string[] = [];

	public addPermission(permissionName: string) {
		if (permissionName === "deleteProducts") {
			throw new Error("Cashier should not be able to delete products!");
		}
		return this.permissions.add(permissionName); /// ????
	}
}
// function isPersonAllowedToDeleteProducts(person: Employee) {
// 	return person.hasPermission("deleteProducts");
// }

const employee = new Employee();
employee.addPermission("deleteProducts");
// isPersonAllowedToDeleteProducts(employee);

const cashier = new Cashier();
cashier.addPermission("ViewProducts");
// isPersonAllowedToDeleteProducts(cashier);
console.log(cashier.permissions);

//> Interface segregation principle
/**
 * Nguyên tắc này là nguyên tắc đầu tiên áp dụng cho các Giao diện thay vì các lớp trong SOLID và nó tương tự như nguyên tắc đầu tiên Single Responsibility Principle (SRP) bạn có thể đọc lại nếu chưa rõ.
 */

interface BirdBad {
	fly(): void;
	walk(): void;
}

class NightingaleBad implements BirdBad {
	public fly() {
		/// ...
	}
	public walk() {
		/// ...
	}
}

class KiwiBad implements BirdBad {
	public fly() {
		throw new Error("Unfortunately, Kiwi can not fly!");
	}
	public walk() {
		/// ...
	}
}

interface CanWalk {
	walk(): void;
}

interface CanFly {
	fly(): void;
}

class Nightingale implements CanFly, CanWalk {
	fly(): void {
		throw new Error("Method not implemented.");
	}
	walk(): void {
		throw new Error("Method not implemented.");
	}
}

class Kiwi implements CanWalk {
	public walk() {
		//
	}
}

//> Dependency inversion principle

/**High-level modules/classes không nên phụ thuộc vào low-level modules/classes. Cả hai đều phải phụ thuộc vào abstractions. */

// interface Person {
//   introduceSelf(): void;
// }

// // class Engineer implements Person {
// //   public introduceSelf() {
// //     console.log("Hi, I'm an engineer!");
// //   }
// // }

// class Musician implements Person {
//   public introduceSelf() {
//     console.log("Hi, I'm a musician!");
//   }
// }

interface IntroductionService {
	introduce(): void;
}

class EngineerIntroductionService implements IntroductionService {
	public introduce() {
		console.log("Hi, I'm an engineer!");
	}
}

class Person {
	public introductionService: IntroductionService;
	constructor(introductionService: IntroductionService) {
		this.introductionService = introductionService;
	}
	/**
	 * introduceSelf
	 */
	public introduceSelf() {
		this.introductionService.introduce();
	}
}

// const person = new Person(new EngineerIntroductionService());

class Engineer implements Person {
	public introductionService: EngineerIntroductionService; 
	constructor(introductionService: IntroductionService) {
		this.introductionService = introductionService;
	}

	public introduceSelf() {
		this.introductionService.introduce();
	}
}

const engineer = new Engineer(new EngineerIntroductionService());




