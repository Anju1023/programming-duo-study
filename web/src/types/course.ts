export interface Lesson {
	id: number;
	title: string;
	description?: string; // Optional if not always present
	order: number;
	unit_id: number;
	challenges?: any[]; // Keep any for now or define Challenge type later if needed deeply
}

export interface Unit {
	id: number;
	title: string;
	description: string;
	order: number;
	lessons: Lesson[];
}

export interface Course {
	id: number;
	title: string;
	description: string;
	units: Unit[];
}

export interface UserProgress {
	active_course_id: number;
	hearts: number;
	points: number;
	has_active_subscription: boolean;
}
