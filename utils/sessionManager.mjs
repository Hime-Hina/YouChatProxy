class SessionManager {
  constructor(provider) {
    this.sessions = provider.sessions;
  }

  // 获取所有可用会话
  getAvailableSessions() {
    return Object.keys(this.sessions).filter((username) => this.sessions[username].valid);
  }

  // 随机选择会话
  getRandomSession() {
    const availableSessions = this.getAvailableSessions();
    if (availableSessions.length === 0) {
      throw new Error('没有可用的会话');
    }
    const randomIndex = Math.floor(Math.random() * availableSessions.length);
    return availableSessions[randomIndex];
  }

  // 策略
  getSessionByStrategy(strategy = 'random') {
    if (strategy === 'random') {
      return this.getRandomSession();
    }
    throw new Error(`未实现的策略: ${strategy}`);
  }
}

export default SessionManager;
