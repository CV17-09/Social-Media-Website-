// Edder- 

import { auth, onAuthStateChanged, signOut } from "./firebase-init.js";

//Tab switch 
function switchTab(tabName) {
    // Hide all tab sections
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => tab.classList.add("hidden"));

    // Show the selected tab
    const activeTab = document.getElementById(tabName + "Tab");
    if (activeTab) {
        activeTab.classList.remove("hidden");
    }

    // Update sidebar nav button states
    const navButtons = document.querySelectorAll("#desktopNav .nav-btn");
    navButtons.forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add("nav-btn-active");
        } else {
            btn.classList.remove("nav-btn-active");
        }
    });
}

// Make switchTab available for inline onclick="switchTab('home')"
window.switchTab = switchTab;

//Upload Avatar img
function setupAvatarUpload() {
    const uploadInput = document.getElementById("uploadAvatar");
    const smallPic = document.getElementById("profilePic");
    const largePic = document.getElementById("profilePicLarge");

    if (!uploadInput) return;

    uploadInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);

        if (smallPic) smallPic.src = url;
        if (largePic) largePic.src = url;
    });
}


//Login to correct User
function setupAuthGuard() {
    onAuthStateChanged(auth, (user) => {
        const profileNameEls = document.querySelectorAll(".profile-name");
        const profileHandleEls = document.querySelectorAll(".profile-handle");
        
        const profilePageName = document.getElementById("profilePageName");
        const profilePageHandle = document.getElementById("profilePageHandle");

        if (!user) {
            // Not logged in → send to login/signup page
            window.location.href = "auth.html";   // change if your auth page has another name
            return;
        }

        // If logged in, update profile name/handle using their email
        const email = user.email || "";
        const baseName = email.includes("@") ? email.split("@")[0] : email;

        profileNameEls.forEach(el => el.textContent = baseName || "Your Name");
        profileHandleEls.forEach(el => el.textContent = baseName ? "@" + baseName : "@yourhandle");

        if (profilePageName) profilePageName.textContent = baseName;
        if (profilePageHandle) profilePageHandle.textContent = "@" + baseName;
    });
}

window.likePost = function (btn) {
    const liked = btn.classList.toggle("liked");
    const countSpan = btn.querySelector("span");
    let count = parseInt(countSpan.textContent, 10);

    if (liked) {
        count += 1;
        btn.querySelector("i").classList.replace("fa-regular", "fa-solid");
        btn.querySelector("i").style.color = "#f87171"; 
    } else {
        count -= 1;
        btn.querySelector("i").classList.replace("fa-solid", "fa-regular");
        btn.querySelector("i").style.color = "";
    }

    countSpan.textContent = count;
};

window.toggleComments = function (btn) {
    alert("Comments coming soon!");
};

window.acceptFollowRequest = function(btn){
    alert("Accept coming soon!");
}

window.declineFollowRequest = function(btn){
    alert("Decline coming soon!");
}


// Edder - Firebase function 
document.addEventListener("DOMContentLoaded", () => {
    // Protect page – only allow logged-in users
    setupAuthGuard();

    // Default tab
    switchTab("home");

    // Enable avatar upload preview
    setupAvatarUpload();


    // PROFILE DROPDOWN + LOGOUT
    const profileMenuToggle = document.getElementById("profileMenuToggle");
    const profileMenu = document.getElementById("profileMenu");
    const logoutBtn = document.getElementById("logoutBtn");

    // Toggle dropdown on "..." click
    if (profileMenuToggle && profileMenu) {
        profileMenuToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // don't immediately close from document click
            profileMenu.classList.toggle("hidden");
        });

        // Close menu if clicking anywhere else
        document.addEventListener("click", (e) => {
            if (!profileMenu.contains(e.target) &&
                !profileMenuToggle.contains(e.target)) {
                profileMenu.classList.add("hidden");
            }
        });
    }

    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            // uses Firebase signOut
            signOut(auth)
                .then(() => {
                    window.location.href = "auth.html"; // back to login page
                })
                .catch(err => {
                    console.error("Logout error:", err);
                });
        });
    }
});
