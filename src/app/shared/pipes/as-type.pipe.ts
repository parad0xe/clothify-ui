import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
	name: 'asType'
})
export class AsTypePipe implements PipeTransform {

	transform<T>(value: any, cls: new () => T, ...args: any[]): T {
		return value as T
	}

}
