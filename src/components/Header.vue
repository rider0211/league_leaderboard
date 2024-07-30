<template>
    <header class="header flex justify-between items-center text-white">
      <div class="flex items-center">
        <img src="../assets/logo.svg" alt="Logo" class="logo" />
      </div>
      <nav class="flex items-center nav-links">
        <router-link to="/schedule" class="nav-link flex items-center">
          <img src="../assets/schedule.png" alt="Schedule" class="icon mr-2" /> <span>Schedule</span>
        </router-link>
        <router-link to="/leaderboard" class="nav-link flex items-center">
          <img src="../assets/leaderboard.png" alt="Leaderboard" class="icon mr-2" /> <span>Leaderboard</span>
        </router-link>
      </nav>
    </header>
</template>
  
<style scoped>
  span {
    font-size: 16px;
  }
  .header {
    background-color: #025FEB;
    padding: 10px 40px;
  }
  
  .logo {
    height: 40px;
    width: 110px;
  }
  
  .nav-links {
    gap: 40px;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
  }
  
  .nav-link:last-child {
    margin-right: 0;
  }
  
  .icon {
    height: 25px;
  }
</style>
  