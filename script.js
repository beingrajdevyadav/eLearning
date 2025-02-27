console.log("👨‍💻 Jai Shree Shyam Baba ❤🙏");

// ---------------------------------------------- 
// Function To Fetch Data From data.json file
// ---------------------------------------------- 

async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error("Network response was not ok!")
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log("There was a problem with fetch operation : ", error)
    }
}

// ---------------------------------------------- 
// Function To Remix Arrays 
// ----------------------------------------------
function remixData(arr) {
    let remixedArr = arr.slice();

    for (let i = remixedArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [remixedArr[i], remixedArr[j]] = [remixedArr[j], remixedArr[i]];
    };

    return remixedArr;
}

// ---------------------------------------------- 
// Function To Display Courses 
// ---------------------------------------------- 
function displayCourses(courses) {

    const coursesDiv = document.querySelector("#courses");
    let html = '';
    courses.forEach(course => {
        html += `
        <div class="course">
                <!-- header  -->
                <div class="course-header">
                    <h3>${course.course}</h3>
                    <hr>
                </div>
                <!-- body -->
                <div class="course-body">
                    <p>${course.courseDescription}</p>
                    <p class="cd"> <span>${course.courseDuration.hours}hrs</span>
                        <span>${course.courseDuration.lectures} lectures</span>
                    </p>
                    <p>By ${course.instructor.name}</p>

                </div>
                <!-- footer -->
                <div class="course-footer">
                    <hr>
                    <div class="course-control">
                        <button>View Details </button>
                        <button>Enroll Now</button>
                    </div>

                </div>
            </div>
        `;
    });

    coursesDiv.innerHTML = html;
}



// ---------------------------------------------- 
// Function To Handle On window load
// ---------------------------------------------- 

window.addEventListener("load", function () {
    fetchData()
        .then(data => {
            // console.log(data);
            let printingData = remixData(data);
            console.log(printingData);
            displayCourses(printingData.slice(0, 9));
        })
})
