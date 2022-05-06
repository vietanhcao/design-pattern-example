/**Nó giúp cho chúng ta định nghĩa được nhiều đối tượng và cho phép các lớp con tự quyết định là cái nào được khởi tạo. Đỡ mất thời gian cho việc định nghĩa này thì tôi tóm tắt nhanh và đi vào những ví dụ cụ thể.  */

// Simple factory
// class VIN {}

// class LUXA20 extends VIN {
// 	run() {
// 		console.log("LUXA20 Ô tô");
// 	}
// }
// class LUXSA20 extends VIN {
// 	run() {
// 		console.log("LUXSA20 Ô tô");
// 	}
// }

// class VINFatory {
// 	static produceVIN(model: string) {
// 		if (model === "A.20") {
// 			return new LUXA20();
// 		} else {
// 			return new LUXSA20();
// 		}
// 	}
// }

// const luxA20 = VINFatory.produceVIN("A.20");
// const luxSA20 = VINFatory.produceVIN("SA.20");

// luxA20.run();
// luxSA20.run();

//Factory Method Pattern

/**Factory method là một pattern nằm trong nhóm Polymorphic Factory (đa hình). Và vì tính trừu tượng của nó, Factory Method còn được gọi là Virtual Constructor. Factory Method giải quyết vấn đề khởi tạo đối tượng mà không chỉ ra cụ thể chính xác lớp nào sẽ khởi tạo, ủy quyền cho lớp con. */

// class VIN {}

// class LUXA20 extends VIN {
// 	run() {
// 		console.log("LUXA20 Ô tô");
// 	}
// }

// class LUXSA20 extends VIN {
// 	run() {
// 		console.log("LUXSA20 Ô tô");
// 	}
// }

// class VINFatory {}

// class LUXA20Factory extends VINFatory {
// 	produceVIN() {
// 		return new LUXA20();
// 	}
// }

// class LUXSA20Factory extends VINFatory {
// 	produceVIN() {
// 		return new LUXSA20();
// 	}
// }

// const luxa20Factory = new LUXA20Factory();
// const luxsa20Factory = new LUXSA20Factory();
// const luxa20 = luxa20Factory.produceVIN();
// const luxsa20 = luxsa20Factory.produceVIN();
// luxa20.run();
// luxsa20.run();

// Abstract factory

/** là một design pattern thuộc nhóm khởi tạo (creational patterns) tuy nhiên nó cao cấp hơn Factory Method Pattern ở chỗ nó cho phép tạo ra một super factory dùng để tạo ra các factory khác */

abstract class VIN {
	abstract run(): void;
}

class LUXA20 extends VIN {
	run(): void {
		console.log("LUXA20 Ô tô");
	}
}

class LUXSA20 extends VIN {
	run(): void {
		console.log("LUSXA20 Ô tô");
	}
}

abstract class VINFactory {
	abstract produceLUXA20(): LUXA20;
	abstract produceLUXSA20(): LUXSA20;
}

class ConcreteVINFactory extends VINFactory {
	produceLUXA20(): LUXA20 {
		return new LUXA20();
	}

	produceLUXSA20(): LUXSA20 {
		return new LUXSA20();
	}
}

const vinFactory = new ConcreteVINFactory();
const luxA20 = vinFactory.produceLUXA20();
const luxSA20 = vinFactory.produceLUXSA20();
luxA20.run();
luxSA20.run();