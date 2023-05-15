import { ValidationErrors, ValidatorFn } from "@angular/forms"

export function MatchValidator(fieldA: string): ValidatorFn {
	return (control): ValidationErrors | null => {
		const matchToControl = control.root.get(fieldA)

		if (!matchToControl) {
			return null
		}

		return (matchToControl.value !== control.value) ? { mismatch: true } : null
	}
}