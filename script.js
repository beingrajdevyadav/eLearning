console.log("👨‍💻 Jai Shree Shyam Baba ❤🙏");

// ---------------------------------------------- 
// Global Variables
// ---------------------------------------------- 
const TotalCourses = [];


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
                    
                </div>
                <!-- body -->
                <div class="course-body">
                <hr>
                    <p>${course.courseDescription}</p>
                    <p> ${handleRatings(course.rating).outerHTML}</p>
                    <p class="cd"> <span><i class="fa-solid fa-clock-rotate-left"></i>  ${course.courseDuration.hours}hrs</span>
                        <span><i class="fa-solid fa-person-chalkboard"></i>  ${course.courseDuration.lectures} lectures</span>
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
// Function To Search Courses 
// ---------------------------------------------- 
function searchCourses() {
    const search = document.querySelector("#searchInput").value;
    const searchResult = TotalCourses.filter(course => {
        return (
            course.course.toLowerCase().includes(search.toLowerCase()) ||
            course.courseDescription.toLowerCase().includes(search.toLowerCase()) ||
            course.instructor.name.toLowerCase().includes(search.toLowerCase())
        );
    });

    console.log(searchResult);
    displayCourses(searchResult);
    document.querySelector("#searchInput").value = '';
}

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchCourses);

// ---------------------------------------------- 
// Function To Handle Rating UI
// ---------------------------------------------- 

function handleRatings(rating) {
    // Create a container div
    const container = document.createElement('div');
    container.style.display = 'inline-block';

    // Create stars
    const starsDiv = document.createElement('div');
    starsDiv.style.display = 'inline-block';
    starsDiv.style.fontSize = '20px';
    starsDiv.style.marginRight = '5px';
    const fullStars = Math.floor(rating.stars);
    const halfStar = rating.stars % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        if (i < fullStars) {
            star.innerHTML = `<i class="fa-solid fa-star"></i> `;  // Full star
            star.style.color = '#c4213c';
        } else if (halfStar && i === fullStars) {
            star.innerHTML = `<i class="fa-solid fa-star-half-stroke"></i> `;  // Half star, using empty star here for simplicity
            star.style.color = '#c4213c';
        } else {
            star.innerHTML = `<i class="fa-solid fa-star"></i> `;  // Empty star
            star.style.color = 'grey';
        }
        starsDiv.appendChild(star);
    }

    container.appendChild(starsDiv);

    // Create counts
    const countsSpan = document.createElement('span');
    countsSpan.innerHTML = `(${rating.counts})`;
    countsSpan.style.marginTop = '5px';
    countsSpan.style.fontSize = '12px';
    countsSpan.style.color = 'grey';

    container.appendChild(countsSpan);

    return container;
}




// ---------------------------------------------- 
// Function To Handle On window load
// ---------------------------------------------- 

window.addEventListener("load", function () {
    fetchData()
        .then(data => {
            // console.log(data);

            let printingData = remixData(data);
            printingData.forEach(course => {
                TotalCourses.push(course);
            });

            // console.log(printingData);
            displayCourses(printingData.slice(0, 9));
        })
})
