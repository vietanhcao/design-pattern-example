//The adapter pattern allows you to make different classes with different interfaces work together, without changing their source code.

//** Adapter pattern là một mẫu thiết kế phần mềm, Adapter Pattern nằm trong nhóm Cấu trúc — Structural Pattern — liên quan đến cấu trúc cho toàn hệ thống, tập trung vào các mối quan hệ giữa các thực thể, các component, làm cho chúng tương tác dễ dàng với nhau hơn. Adapter Pattern đóng vai trò trung gian, tương thích cho hệ thống sẵn có đối ứng với các component mới mà không cần phải sửa đổi code, cho phép các interface không liên quan đến nhau có thể làm việc cùng nhau */
interface IPhone {
	useLightning(): void;
}

interface Android {
	useMicroUSB(): void;
}

class IPhone7 implements IPhone {
	useLightning(): void {
		console.log("Using lightning");
	}
}

class GooglePixel implements Android {
	useMicroUSB(): void {
		console.log("Using microUSB");
	}
}

class MicroUSBToLightningAdapter implements Android {
	iphoneDevice: IPhone;
	constructor(iphone: IPhone) {
		this.iphoneDevice = iphone;
	}

	public useMicroUSB(): void {
		console.log(" Want to useMicroUSB, converting to lightning");
		this.iphoneDevice.useLightning();
	}
}

const iphone = new IPhone7();

let changeAdapter = new MicroUSBToLightningAdapter(iphone);
changeAdapter.useMicroUSB();
