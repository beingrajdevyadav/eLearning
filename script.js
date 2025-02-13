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
        console.log(data);
    } catch (error) {
        console.log("There was a problem with fetch operation : ", error)
    }
}





