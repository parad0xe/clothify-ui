import { Injectable } from '@angular/core';
import AbstractResource from "../../core/resource.abstract"
import UserModel from "../../core/models/user.model"


@Injectable({
	providedIn: 'root'
})
export class UserResource extends AbstractResource<UserModel> {
	protected model = UserModel
}
