import { Subscription } from "rxjs"


export class SubscriptionHelper {
	private _subscriptions: Subscription[] = []

	set add(subscription: Subscription) {
		this._subscriptions.push(subscription)
	}

	unsubscribeAll() {
		this._subscriptions.map(subscription => subscription.unsubscribe())
	}
}