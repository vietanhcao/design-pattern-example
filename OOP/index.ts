// Abstract: OOP class

abstract class Avengers {
	readonly name: string;

	protected constructor(name: string) {
		this.name = name;
	}

	// Hàm này được triển khai ở lớp dẫn xuất
	abstract fight(): void;
}

class IronMan extends Avengers {
	// Constructor trong lớp dẫn xuất phải gọi super()
	constructor(name: string) {
		super(name);
	}

	fight(): void {
		console.log(`${this.name} is a super warrior`);
	}

	fly(): void {
		console.log(`${this.name} can fly`);
	}
}

// Có thể tạo một tham chiếu với kiểu dữ liệu là lớp trừu tượng
let ironMan: Avengers;

//Error: không thể tạo một thể hiện của lớp trừu tượng.
//? ironMan = new Avenger("Tony Stark");

//OK: Có thể tạo một thể hiện từ lớp dẫn xuất.
ironMan = new IronMan("Tony Stark");

ironMan.fight();

// Error: phương thức không tồn tại trong lớp trừu tượng (Avengers).
//? ironMan.fly();

//==========================================================================================
interface IAvengers {
	readonly name: string;

	// Hàm này bắt buộc phải được triển khai ở lớp dẫn xuất
	fight(): void;
}

interface IPower {
	// Hàm này bắt buộc phải được triển khai ở lớp dẫn xuất
	fly(): void;
}

class IronManClassic implements IAvengers, IPower {
	readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	fight(): void {
		console.log(`${this.name} is a super warrior`);
	}

	fly(): void {
		console.log(`${this.name} can fly`);
	}
}

//=========================================Encapsulation======================================
/**
 * Tính đóng gói (encapsulation) và che giấu thông tin (information hiding): Tính chất này không cho phép người sử dụng các đối tượng thay đổi trạng thái nội tại của một đối tượng. Chỉ có các phương thức nội tại của đối tượng cho phép thay đổi trạng thái của nó.
 *
 * another example:
 * Hay tưởng tượng bạn là một anh chàng “sửa ống nước” (class) có rất nhiều đồ nghề như “cờ lê tua vít” (properties), một hôm nọ chị hàng xóm qua mượn bạn cái “cờ lê”, thay vì bảo chị hàng xóm cứ tự nhiên vào lục lọi, bạn sẽ bảo: “Ấy chị cứ ở nhà, để em mang cái cờ lê (method) qua cho chị”. Đấy chỉ đơn giản thế thôi, chị hàng xóm vừa được mượn cái cờ lê, mà bạn cũng không bị chị ấy qua tận nhà dòm ngó, lại còn đảm bảo chị ấy không trả nhầm cái cờ lê của thằng hàng xóm khác.
 */

class BankUser {
	private balance: number;
	private name: string;
	private userId: number;

	public transferMoney(toUser: number, money: number) {
		// Nếu tài khoản tồn tài thì chuyển tiền
		if (this.checkTargetUser(toUser)) {
			this.minusBalance(money);
			this.addBalanceforUser(toUser, money);
			return true;
		}
		return false;
	}

	// Hàm này kiểm tra xem tài khoản đích có tồn tại không?
	private checkTargetUser(id: number) {
		return id;
	}

	// Hàm này trừ tiền tài khoản của tài khoản gửi
	private minusBalance(money: number) {}

	// Hàm này thêm cộng tiền cho tài khoản nhận.
	private addBalanceforUser(id: number, money: number) {}
}

//=========================================Polymorphism======================================

//> overriding

class Animal {
	name: string;
	constructor(theName: string) {
		this.name = theName;
	}
	move(distanceInMeters: number = 0) {
		console.log(`${this.name} moved ${distanceInMeters}m.`);
	}
}

class Snake extends Animal {
	constructor(name: string) {
		super(name);
	}
	move(distanceInMeters = 5) {
		console.log("Slithering...");
		super.move(distanceInMeters);
	}
}

class Horse extends Animal {
	constructor(name: string) {
		super(name);
	}
	move(distanceInMeters = 45) {
		console.log("Galloping...");
		super.move(distanceInMeters);
	}
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

//> Overloading
export class HinhHoc {
	draw();
	draw(canh: number);
	draw(dai: number, rong: number);
	draw(param1?: number, param2?: number) {
		if (param1 === undefined && param2 === undefined) {
			console.log("Ve hinh");
		}
		if (param2 === undefined) {
			console.log("Ve hinh vuong");
		}
		if (param1 !== undefined && param2 !== undefined) {
			console.log("Ve hinh chu nhat");
		}
	}
}

const hinhHoc = new HinhHoc();
hinhHoc.draw(23); //hinh vuong
hinhHoc.draw(23, 9); //hinh chu nhat

//==================================Inheritance==========================================


