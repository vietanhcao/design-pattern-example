/**Builder Pattern phân tách một đối tượng phức tạp thành nhiều phần tương đối đơn giản, sau đó tạo chúng riêng biệt theo các nhu cầu khác nhau, và cuối cùng là xây dựng đối tượng phức tạp.  */
class Car {
	engine: string;
	wheel: string;
	body: string;
	chassis: string;

	constructor(engine: string, wheel: string, body: string, chassis: string) {
		this.engine = engine;
		this.wheel = wheel;
		this.body = body;
		this.chassis = chassis;
	}

	toString(): string {
		return JSON.stringify(this);
	}
}

class CarBuilder {
	engine = "";
	wheel = "";
	body = "";
	chassis = "";

	build(): Car {
		return new Car(this.engine, this.wheel, this.body, this.chassis);
	}

	setEngine(engine: string): CarBuilder {
		this.engine = engine;
		return this;
	}

	setWheel(wheel: string): CarBuilder {
		this.wheel = wheel;
		return this;
	}

	setBody(body: string): CarBuilder {
		this.body = body;
		return this;
	}

	setChassis(chassis: string): CarBuilder {
		this.chassis = chassis;
		return this;
	}
}

const car1 = new CarBuilder()
	.setEngine("v12")
	.setWheel("4")
	.setBody("KIA SOLUTO")
	.setChassis("LUXURY")
	.build();

console.log(car1.toString());
