const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLessons(json.data))
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickBtn);
            clickBtn.classList.add("active");
            displayLevelWord(data.data);
        });
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full textgr space-y-4">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
      <p class="text-xl font-medium font-bangla text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="font-bangla font-medium text-4xl">নেক্সট Lesson এ যান</h2>
    </div>
        `;
        return;
    }

    //     {
    //     "id": 79,
    //     "level": 1,
    //     "word": "Jump",
    //     "meaning": "লাফানো",
    //     "pronunciation": "জাম্প"
    // }

    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
      <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি "}</h2>
      <p class="font-semibold">Meaning / Pronounciation</p>
      <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "শব্দার্থ পাওয়া যায়নি "} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি "}"</div>
      <div class="flex justify-between items-center">
        <button class="btn bg-blue-100 hover:bg-blue-500"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-blue-100 hover:bg-blue-500"><i class="fa-solid fa-volume-low"></i></button>
      </div>
    </div>
        `;
        wordContainer.append(card);
    });
};

const displayLessons = (lessons) => {
    // 1. get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2. get into every lessons  
    for (let lesson of lessons) {

        //     3. creat Element
        // console.log(lesson)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i></i>Lesson - ${lesson.level_no}</button>
        `;
        //     4. appent into container

        levelContainer.append(btnDiv);
    }
};

loadLessons();