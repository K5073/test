<template>
    <div>
      <!-- 상단 고정바 -->
      <header>
        <img src="@/assets/book.jpg" alt="Logo" class="logo" @click="goToHome"/>
        <input type="text" placeholder="검색..." class="search-input" />
        <button @click="goToLogin" class="login-button">로그인 및 회원가입</button>
      </header>
  
      <!-- 메뉴바 -->
      <nav class="navbar">
        <ul>
          <li><router-link to="/category">카테고리</router-link></li>
          <li><router-link to="/community">커뮤니티</router-link></li>
          <li><router-link to="/guidelines">이용안내</router-link></li>
          <li><router-link to="/mybooks">나만의책장</router-link></li>
        </ul>
      </nav>
  
      <!-- 본문 내용 -->
      <main>
        <h1>홈 화면</h1>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
    methods: {
      goToLogin() {
        this.$router.push('/login'); // 로그인 화면으로 이동
      },
      goToHome() {
        this.$router.push('/'); // 홈 화면으로 이동
      }
    },
  };
  </script>
  
  <style scoped>
  /* 상단 고정바 스타일 */
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 10px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  
  /* 로고 */
  .logo {
    width: 10%;
    height: 50px;
    cursor: pointer;
  }
  
  /* 검색창 */
  .search-input {
    padding: 10px 100px;
    font-size: 16px;
    border: 5px solid #FFA500;
    border-radius: 100px;
  }
  
  /* 로그인 및 회원가입 버튼 */
  .login-button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #FFA500;
    color: white;
    border: none;
    border-radius: 4px;
    margin-right: 40px;
    border: 2px solid #FFA500;
  }
  
  /* 메뉴바 스타일 */
  .navbar {
    position: fixed;
    top: 70px; /* 상단 고정바 아래 위치 */
    left: 0;
    width: 100%;
    background-color: #FFA500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 90;
  }
  
  .navbar ul {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 25px 0;
  }
  
  .navbar ul li {
    list-style: none;
    margin: 0 80px;
    position: relative;
  }
  
  .navbar ul li a {
    text-decoration: none;
    color: #fff;
    font-size: 16px;
    padding: 5px 0;
  }
  
  /* 본문 내용 */
  main {
    margin-top: 150px;
    padding: 20px;
  }
  </style>
  