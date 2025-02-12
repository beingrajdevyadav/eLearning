course = {
    course: "string",
    courseName: "string",
    courseDescription: "string",
    rating: {
        stars: number,
        counts: number,
    },
    instructor: {
        name: "string",
        gender: "string",
    },
    courseDuration: {
        hours: number,
        lectures: number,
    },
    coursePrice: number,
    courseLevel: {
        begginer: boolean,
        intermediate: boolean,
        export: boolean,
        allLevel: boolean,
    },
    courseTag: {
        bestSeller: boolean,
        newest: boolean,
        popular: boolean,
    },
    courseType: {
        paid: boolean,
        free: boolean,
    },
    courseTopic: "string",
    courseFeatures: {
        subtitle: boolean,
        quizes: boolean,
        codingExercise: boolean,
        practiceTest: boolean,
    }
}