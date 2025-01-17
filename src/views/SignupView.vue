<template>
  <div class="form-container">
    <button @click="goBack" class="back-button">◁</button>

    <h2>회원가입</h2>

    <form @submit.prevent="handleSignup">
      <!-- 이메일 -->
      <div class="form-group">
        <label for="email">이메일</label>
        <div class="email-input-wrapper">
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="이메일 입력" 
            required 
          />
          <button type="button" @click="checkEmailDuplicate">중복 확인</button>
        </div>
        <span v-if="emailErrorMessage" style="color: red;">{{ emailErrorMessage }}</span>
      </div>

      <div class="form-group">
        <label for="verificationCode">인증번호</label>
        <div class="email-input-wrapper">
          <input 
            type="text" 
            id="verificationCode" 
            v-model="verificationCode" 
            placeholder="인증번호 입력" 
            required 
          />
          <button type="button" @click="sendVerificationCode">인증번호 받기</button>
          <button type="button" @click="verifyCode">인증하기</button>
        </div>
        <span v-if="verificationErrorMessage" style="color: red;">{{ verificationErrorMessage }}</span>
      </div>

      <!-- 비밀번호 -->
      <div class="form-group">
        <label for="password">비밀번호</label>
        <div class="password-input-wrapper">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="비밀번호 입력"
            required
          />
          <span class="toggle-visibility" @click="togglePasswordVisibility('password')">
            {{ passwordVisible ? '👁️' : '👁️‍🗨️' }}
          </span>
        </div>
      </div>
    
      <!-- 비밀번호 확인 -->
      <div class="form-group">
        <label for="passwordConfirm">비밀번호 확인</label>
        <div class="password-input-wrapper">
          <input
            :type="passwordConfirmVisible ? 'text' : 'password'"
            id="passwordConfirm"
            v-model="passwordConfirm"
            placeholder="비밀번호 확인 입력"
            required
          />
          <span class="toggle-visibility" @click="togglePasswordVisibility('passwordConfirm')">
            {{ passwordConfirmVisible ? '👁️' : '👁️‍🗨️' }}
          </span>
        </div>
      </div>

      <!-- 이름 -->
      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" id="name" v-model="name" placeholder="이름 입력" required />
      </div>

      <!-- 닉네임 -->
      <div class="form-group">
        <label for="nickname">닉네임</label>
        <input type="text" id="nickname" v-model="nickname" placeholder="닉네임 입력" required />
      </div>

      <!-- 생년월일 -->
      <div class="form-group">
        <label for="birthdate">생년월일</label>
        <input
          type="text"
          id="birthdate"
          v-model="birthdate"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          required
        />
      </div>

      <!-- 성별 -->
      <div class="form-group">
        <label>성별</label>
        <div class="gender">
          <label>
            <input type="radio" value="남" v-model="gender" required /> 남
          </label>
          <label>
            <input type="radio" value="여" v-model="gender" required /> 여
          </label>
        </div>
      </div>

      <!-- 선호 장르 -->
      <div class="form-group">
        <label>선호 장르</label>
        <div class="genre-select">
          <label for="genre1">[장르 1]</label>
          <select v-model="selectedGenre1" id="genre1" required>
            <option value="" disabled selected>선택</option>
            <option v-for="genre in allGenres" :key="genre" :value="genre">{{ genre }}</option>
          </select>
        </div>
        <div class="genre-select">
          <label for="genre2">[장르 2]</label>
          <select v-model="selectedGenre2" id="genre2">
            <option value="" disabled selected>선택</option>
            <option v-for="genre in allGenres" :key="genre" :value="genre">{{ genre }}</option>
          </select>
        </div>
        <div class="genre-select">
          <label for="genre3">[장르 3]</label>
          <select v-model="selectedGenre3" id="genre3">
            <option value="" disabled selected>선택</option>
            <option v-for="genre in allGenres" :key="genre" :value="genre">{{ genre }}</option>
          </select>
        </div>
      </div>

      <button type="submit" class="signup-button">회원가입하기</button>
    </form>
  </div>
</template>

<script>
import axios from "axios"; // axios import 추가

export default {
  name: "SignupView",
  data() {
    return {
      email: "",
      verificationCode: "",
      password: "",
      passwordConfirm: "",
      passwordVisible: false,
      passwordConfirmVisible: false,
      name: "",
      nickname: "",
      birthdate: "",
      gender: "",
      selectedGenre1: "",
      selectedGenre2: "",
      selectedGenre3: "",
      allGenres: [
        "도서관, 서지학", "문헌정보학", "백과사전", "강연집, 수필집, 연설문집",
        "일반 연속간행물", "일반학회, 단체, 협회, 기관", "신문, 언론, 저널리즘", "일반전집, 총서", "향토자료",
      ],
      emailErrorMessage: "",
      verificationErrorMessage: "",
      isVerificationCodeSent: false,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/login");
    },
    
    async checkEmailDuplicate() {
      try {
        const response = await axios.post("/api/user/register", { email: this.email });
        if (response.data.isDuplicate) {
          this.emailErrorMessage = "이미 사용된 이메일입니다.";
        } else {
          this.emailErrorMessage = "";
        }
      } catch (error) {
        console.error("이메일 중복 확인 오류:", error);
      }
    },

    async sendVerificationCode() {
      if (!this.email) {
        alert("이메일을 입력해주세요.");
        return;
      }
      try {
        const response = await axios.post("/api/user/register", { email: this.email });
        if (response.data.success) {
          alert("인증번호가 이메일로 전송되었습니다.");
          this.isVerificationCodeSent = true;
        } else {
          alert("인증번호 전송에 실패했습니다.");
        }
      } catch (error) {
        console.error("인증번호 전송 오류:", error);
      }
    },

    async verifyCode() {
      if (!this.verificationCode) {
        alert("인증번호를 입력해주세요.");
        return;
      }
      try {
        const response = await axios.post("/api/user/register", {
          email: this.email,
          verificationCode: this.verificationCode,
        });
        if (response.data.isValid) {
          this.verificationErrorMessage = "";
          alert("인증 성공");
        } else {
          this.verificationErrorMessage = "인증번호가 올바르지 않습니다.";
        }
      } catch (error) {
        console.error("인증번호 확인 오류:", error);
      }
    },

    async handleSignup() {
      if (this.password !== this.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      const signupData = {
        email: this.email,
        password: this.password,
        name: this.name,
        nickname: this.nickname,
        birthdate: this.birthdate,
        gender: this.gender,
        genres: [this.selectedGenre1, this.selectedGenre2, this.selectedGenre3],
      };
      console.log("회원가입 데이터:", signupData);
      try {
        const response = await axios.post("/api/user/register", signupData);
        if (response.data.success) {
          alert("회원가입 성공!");
        } else {
          alert("회원가입 실패.");
        }
      } catch (error) {
        console.error("회원가입 오류:", error);
      }
    },

    togglePasswordVisibility(field) {
      if (field === "password") {
        this.passwordVisible = !this.passwordVisible;
      } else if (field === "passwordConfirm") {
        this.passwordConfirmVisible = !this.passwordConfirmVisible;
      }
    },
  },
};
</script>

  
<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.email-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px; /* 입력란과 버튼 사이의 간격 */
}

.email-input-wrapper input {
  flex: 1; /* 입력란이 가로로 확장되도록 설정 */
}

.email-input-wrapper button {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.email-input-wrapper button:hover {
  background-color: #218838;
}

/* 비밀번호 스타일 추가 */
.password-input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.password-input-wrapper input {
  flex: 1;
}

.toggle-visibility {
  cursor: pointer;
  padding: 0 10px;
  font-size: 18px;
  color: #666;
  user-select: none;
}

input,
select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* 성별 체크박스 */
.gender {
  display: flex;
  justify-content: space-around;
}

.gender label {
  display: flex;
  align-items: center;
  gap: 7px; /* 텍스트와 체크박스 간격 */
}

.signup-button {
  width: 100%;
  padding: 8px; /* 버튼 크기 줄이기 */
  font-size: 14px; /* 폰트 크기 줄이기 */
  color: #fff;
  background: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signup-button:hover {
  background: #218838;
}
</style>