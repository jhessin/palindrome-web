import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const startValue: number = parseInt(cookies.get('startValue') || '0');
	return {
		startValue
	};
};

export const actions: Actions = {
	async default({ cookies, request }) {
		const data = await request.formData();
		const startValue = data.get('startValue');
		cookies.set('startValue', startValue?.toString() || '0');
	}
};
