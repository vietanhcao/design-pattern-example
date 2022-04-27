//The adapter pattern allows you to make different classes with different interfaces work together, without changing their source code. 
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
    console.log(" Want to useMicroUSB, converting to lightning")
    this.iphoneDevice.useLightning();
  }

}

const iphone = new IPhone7();

let changeAdapter = new MicroUSBToLightningAdapter(iphone);
changeAdapter.useMicroUSB();




