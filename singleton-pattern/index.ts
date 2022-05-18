/**Singleton được sử dụng để tạo một thể hiện (Instance) của một lớp (Class) nếu nó không tồn tại hoặc trả về tham chiếu của lớp hiện có. Nói cách khác, các Singleton được tạo chính xác một lần trong thời gian chạy của ứng dụng trong phạm vi toàn cầu (global scope) */

class Singleton {
	private static singleton: Singleton;
	constructor() {}
	// Cung cấp một tĩnh thức phương thức để lấy một đối tượng
	static getInstance() {
		if (!Singleton.singleton) {
			Singleton.singleton = new Singleton();
		}
		return Singleton.singleton;
	}
}

let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true
