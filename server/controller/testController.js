const courses = [
	{
		courseId: "1",
		courseName: 'US history',
		professor: 'Jim Brown',
		classSchedule: 'M TH 9-11 AM'
	},
	{
		courseId: "2",
		courseName: 'Spanish',
		professor: 'Jose Cortez',
		classSchedule: 'T TH 10-11:30 AM'
	}
]

const getData = async (params) => {
	console.log(params);

	return {
		success: true,
		records: courses
	};

};

const getDataSecure = async (params) => {
	console.log(params);
	return courses;
}


const getDataPost = async (params) => {
	console.log('postmeth',params);

	return courses;
}



module.exports = {
	getData,
	getDataSecure,
	getDataPost
}


