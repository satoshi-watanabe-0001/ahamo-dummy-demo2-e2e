#!/usr/bin/env node

/**
 * テスト結果収集・ダッシュボード更新スクリプト
 * CI/CDパイプラインから実行され、個別テストケース結果を収集してダッシュボードを更新する
 */

const fs = require('fs')
const path = require('path')

class TestResultCollector {
  constructor() {
    this.results = {
      unitTests: { total: 0, passed: 0, failed: 0, details: [] },
      integrationTests: { total: 0, passed: 0, failed: 0, details: [] },
      e2eTests: { total: 0, passed: 0, failed: 0, details: [] },
      errorHandlingTests: { total: 0, passed: 0, failed: 0, details: [] },
      coverage: { statements: 0, branches: 0, functions: 0, lines: 0 },
      timestamp: new Date().toISOString(),
      executionTime: { unit: 0, integration: 0, e2e: 0, error: 0 },
      totalTestCases: 0,
      overallStatus: 'unknown',
    }
  }

  /**
   * Jest個別テストケース結果を収集
   */
  async collectJestTestCases() {
    try {
      const jestResultsPath = path.join(process.cwd(), 'test-results.json')
      if (fs.existsSync(jestResultsPath)) {
        const jestResults = JSON.parse(fs.readFileSync(jestResultsPath, 'utf8'))

        jestResults.testResults.forEach(testFile => {
          const isIntegration = testFile.name.includes('integration')
          const isErrorHandling = testFile.name.includes('logging')

          const category = isIntegration
            ? 'integrationTests'
            : isErrorHandling
              ? 'errorHandlingTests'
              : 'unitTests'

          testFile.assertionResults.forEach(test => {
            this.results[category].total++
            if (test.status === 'passed') {
              this.results[category].passed++
            } else {
              this.results[category].failed++
            }

            this.results[category].details.push({
              name: test.title,
              fullName: test.fullName,
              status: test.status,
              duration: test.duration || 0,
              file: path.basename(testFile.name),
              failureMessages: test.failureMessages || [],
              assertions: test.numPassingAsserts || 0,
            })
          })

          this.results.executionTime[
            category === 'unitTests'
              ? 'unit'
              : category === 'integrationTests'
                ? 'integration'
                : 'error'
          ] += testFile.perfStats?.end - testFile.perfStats?.start || 0
        })
      }
    } catch (error) {
      console.error('Jest結果収集エラー:', error)
    }
  }

  /**
   * Playwright個別テストケース結果を収集
   */
  async collectPlaywrightTestCases() {
    try {
      const playwrightResultsPath = path.join(process.cwd(), 'playwright-report/results.json')
      if (fs.existsSync(playwrightResultsPath)) {
        const playwrightResults = JSON.parse(fs.readFileSync(playwrightResultsPath, 'utf8'))

        if (playwrightResults.suites) {
          playwrightResults.suites.forEach(suite => {
            suite.specs.forEach(spec => {
              spec.tests.forEach(test => {
                this.results.e2eTests.total++

                const passed = test.results.every(result => result.status === 'passed')
                if (passed) {
                  this.results.e2eTests.passed++
                } else {
                  this.results.e2eTests.failed++
                }

                this.results.e2eTests.details.push({
                  name: test.title,
                  fullName: `${suite.title} > ${test.title}`,
                  status: passed ? 'passed' : 'failed',
                  duration: test.results[0]?.duration || 0,
                  file: path.basename(suite.file || suite.title),
                  browser:
                    test.results[0]?.workerIndex !== undefined
                      ? `Browser-${test.results[0].workerIndex}`
                      : 'Unknown',
                  retries: test.results.length - 1,
                })

                this.results.executionTime.e2e += test.results[0]?.duration || 0
              })
            })
          })
        }
      }
    } catch (error) {
      console.error('Playwright結果収集エラー:', error)
    }
  }

  /**
   * カバレッジ情報を収集
   */
  async collectCoverageResults() {
    try {
      const coveragePath = path.join(process.cwd(), 'coverage/coverage-summary.json')
      if (fs.existsSync(coveragePath)) {
        const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'))
        this.results.coverage = {
          statements: coverage.total.statements.pct,
          branches: coverage.total.branches.pct,
          functions: coverage.total.functions.pct,
          lines: coverage.total.lines.pct,
        }
      }
    } catch (error) {
      console.error('カバレッジ収集エラー:', error)
    }
  }

  /**
   * 拡張ダッシュボードHTMLを生成・更新
   */
  async updateEnhancedDashboard() {
    try {
      this.totalTestCases =
        this.results.unitTests.total +
        this.results.integrationTests.total +
        this.results.e2eTests.total +
        this.results.errorHandlingTests.total

      const totalPassed =
        this.results.unitTests.passed +
        this.results.integrationTests.passed +
        this.results.e2eTests.passed +
        this.results.errorHandlingTests.passed

      const totalFailed =
        this.results.unitTests.failed +
        this.results.integrationTests.failed +
        this.results.e2eTests.failed +
        this.results.errorHandlingTests.failed

      this.overallStatus = totalFailed === 0 ? 'success' : 'failed'

      const enhancedDashboardContent = this.generateEnhancedDashboardHTML()

      const outputPath = path.join(process.cwd(), 'enhanced-dashboard.html')
      fs.writeFileSync(outputPath, enhancedDashboardContent)
      console.log('拡張ダッシュボードが生成されました')
    } catch (error) {
      console.error('拡張ダッシュボード更新エラー:', error)
    }
  }

  /**
   * 拡張ダッシュボードHTMLコンテンツを生成
   */
  generateEnhancedDashboardHTML() {
    return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>フロントエンド試験実装詳細ダッシュボード - 自動更新対応</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
        .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; color: white; margin-bottom: 30px; }
        .header h1 { font-size: 2.5rem; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .auto-update-indicator { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin-top: 10px; }
        .status-dot { width: 12px; height: 12px; border-radius: 50%; animation: pulse 2s infinite; }
        .status-dot.success { background: #4CAF50; }
        .status-dot.failed { background: #f44336; }
        .status-dot.running { background: #ff9800; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; border-radius: 15px; padding: 25px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .stat-title { font-size: 1.1rem; font-weight: 600; color: #333; }
        .stat-number { font-size: 2.5rem; font-weight: bold; color: #667eea; }
        .stat-details { display: flex; gap: 15px; margin-top: 10px; }
        .stat-detail { text-align: center; }
        .stat-detail-number { font-size: 1.5rem; font-weight: bold; }
        .stat-detail-label { font-size: 0.9rem; color: #666; }
        .passed { color: #4CAF50; }
        .failed { color: #f44336; }
        
        .test-sections { display: grid; gap: 25px; }
        .test-section { background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
        .section-header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
        .section-title { font-size: 1.3rem; font-weight: 600; }
        .section-stats { display: flex; gap: 20px; }
        .section-stat { text-align: center; }
        .section-stat-number { font-size: 1.2rem; font-weight: bold; }
        .section-stat-label { font-size: 0.8rem; opacity: 0.9; }
        
        .section-content { padding: 0; max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .section-content.expanded { max-height: 2000px; padding: 20px; }
        .test-case { border-bottom: 1px solid #eee; padding: 15px 0; }
        .test-case:last-child { border-bottom: none; }
        .test-case-header { display: flex; justify-content: between; align-items: center; margin-bottom: 8px; }
        .test-case-name { font-weight: 600; color: #333; flex: 1; }
        .test-case-status { padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
        .test-case-status.passed { background: #e8f5e8; color: #2e7d32; }
        .test-case-status.failed { background: #ffebee; color: #c62828; }
        .test-case-details { font-size: 0.9rem; color: #666; display: flex; gap: 15px; }
        
        .last-updated { text-align: center; color: white; margin-top: 30px; font-size: 0.9rem; opacity: 0.8; }
        .search-filter { background: white; border-radius: 10px; padding: 15px; margin-bottom: 20px; }
        .search-input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>フロントエンド試験実装詳細ダッシュボード</h1>
            <div class="auto-update-indicator">
                <div class="status-dot ${this.overallStatus}"></div>
                <span>自動更新対応 - 最終更新: ${new Date(this.results.timestamp).toLocaleString('ja-JP')}</span>
            </div>
        </div>

        <div class="search-filter">
            <input type="text" class="search-input" placeholder="テストケース名で検索..." id="searchInput">
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">総テストケース数</div>
                </div>
                <div class="stat-number">${this.totalTestCases}</div>
                <div class="stat-details">
                    <div class="stat-detail">
                        <div class="stat-detail-number passed">${this.results.unitTests.passed + this.results.integrationTests.passed + this.results.e2eTests.passed + this.results.errorHandlingTests.passed}</div>
                        <div class="stat-detail-label">成功</div>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-detail-number failed">${this.results.unitTests.failed + this.results.integrationTests.failed + this.results.e2eTests.failed + this.results.errorHandlingTests.failed}</div>
                        <div class="stat-detail-label">失敗</div>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">単体テスト</div>
                </div>
                <div class="stat-number">${this.results.unitTests.total}</div>
                <div class="stat-details">
                    <div class="stat-detail">
                        <div class="stat-detail-number passed">${this.results.unitTests.passed}</div>
                        <div class="stat-detail-label">成功</div>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-detail-number failed">${this.results.unitTests.failed}</div>
                        <div class="stat-detail-label">失敗</div>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">統合テスト</div>
                </div>
                <div class="stat-number">${this.results.integrationTests.total}</div>
                <div class="stat-details">
                    <div class="stat-detail">
                        <div class="stat-detail-number passed">${this.results.integrationTests.passed}</div>
                        <div class="stat-detail-label">成功</div>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-detail-number failed">${this.results.integrationTests.failed}</div>
                        <div class="stat-detail-label">失敗</div>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">E2Eテスト</div>
                </div>
                <div class="stat-number">${this.results.e2eTests.total}</div>
                <div class="stat-details">
                    <div class="stat-detail">
                        <div class="stat-detail-number passed">${this.results.e2eTests.passed}</div>
                        <div class="stat-detail-label">成功</div>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-detail-number failed">${this.results.e2eTests.failed}</div>
                        <div class="stat-detail-label">失敗</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="test-sections">
            ${this.generateTestSectionHTML('単体テスト', this.results.unitTests)}
            ${this.generateTestSectionHTML('統合テスト', this.results.integrationTests)}
            ${this.generateTestSectionHTML('E2Eテスト', this.results.e2eTests)}
            ${this.generateTestSectionHTML('エラーハンドリングテスト', this.results.errorHandlingTests)}
        </div>
    </div>

    <script>
        class DashboardAutoUpdater {
            constructor() {
                this.updateInterval = 30000; // 30秒
                this.init();
            }

            init() {
                this.setupSearch();
                this.setupSectionToggle();
                this.startAutoUpdate();
            }

            setupSearch() {
                const searchInput = document.getElementById('searchInput');
                searchInput.addEventListener('input', (e) => {
                    this.filterTestCases(e.target.value);
                });
            }

            setupSectionToggle() {
                document.querySelectorAll('.section-header').forEach(header => {
                    header.addEventListener('click', () => {
                        const content = header.nextElementSibling;
                        content.classList.toggle('expanded');
                    });
                });
            }

            filterTestCases(searchTerm) {
                const testCases = document.querySelectorAll('.test-case');
                testCases.forEach(testCase => {
                    const testName = testCase.querySelector('.test-case-name').textContent.toLowerCase();
                    if (testName.includes(searchTerm.toLowerCase())) {
                        testCase.style.display = 'block';
                    } else {
                        testCase.style.display = 'none';
                    }
                });
            }

            async startAutoUpdate() {
                setInterval(async () => {
                    try {
                        const response = await fetch('test-results-summary.json');
                        if (response.ok) {
                            const data = await response.json();
                            this.updateDashboard(data);
                        }
                    } catch (error) {
                        console.log('自動更新チェック:', error.message);
                    }
                }, this.updateInterval);
            }

            updateDashboard(data) {
                const totalTests = data.unitTests.total + data.integrationTests.total + 
                                 data.e2eTests.total + data.errorHandlingTests.total;
                
                document.querySelector('.stat-number').textContent = totalTests;
                
                const updateTime = new Date(data.timestamp).toLocaleString('ja-JP');
                document.querySelector('.auto-update-indicator span').textContent = 
                    \`自動更新対応 - 最終更新: \${updateTime}\`;
                
                const statusDot = document.querySelector('.status-dot');
                statusDot.className = 'status-dot ' + data.overallStatus;
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            new DashboardAutoUpdater();
        });
    </script>
</body>
</html>`
  }

  /**
   * テストセクションHTMLを生成
   */
  generateTestSectionHTML(sectionTitle, testData) {
    const testCasesHTML = testData.details
      .map(
        test => `
        <div class="test-case">
            <div class="test-case-header">
                <div class="test-case-name">${test.name}</div>
                <div class="test-case-status ${test.status}">${test.status === 'passed' ? '成功' : '失敗'}</div>
            </div>
            <div class="test-case-details">
                <span>ファイル: ${test.file}</span>
                <span>実行時間: ${test.duration}ms</span>
                ${test.assertions ? `<span>アサーション: ${test.assertions}</span>` : ''}
                ${test.browser ? `<span>ブラウザ: ${test.browser}</span>` : ''}
            </div>
        </div>
    `
      )
      .join('')

    return `
        <div class="test-section">
            <div class="section-header">
                <div class="section-title">${sectionTitle}</div>
                <div class="section-stats">
                    <div class="section-stat">
                        <div class="section-stat-number">${testData.total}</div>
                        <div class="section-stat-label">総数</div>
                    </div>
                    <div class="section-stat">
                        <div class="section-stat-number passed">${testData.passed}</div>
                        <div class="section-stat-label">成功</div>
                    </div>
                    <div class="section-stat">
                        <div class="section-stat-number failed">${testData.failed}</div>
                        <div class="section-stat-label">失敗</div>
                    </div>
                </div>
            </div>
            <div class="section-content">
                ${testCasesHTML}
            </div>
        </div>
    `
  }

  /**
   * テスト結果JSONを出力
   */
  async saveResults() {
    const outputPath = path.join(process.cwd(), 'test-results-summary.json')
    fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2))
    console.log(`テスト結果が保存されました: ${outputPath}`)
  }

  /**
   * メイン実行関数
   */
  async run() {
    console.log('テスト結果収集を開始...')

    await this.collectJestTestCases()
    await this.collectPlaywrightTestCases()
    await this.collectCoverageResults()
    await this.updateEnhancedDashboard()
    await this.saveResults()

    console.log('テスト結果収集が完了しました')
    console.log(`総テストケース数: ${this.totalTestCases}`)
    console.log(
      `単体テスト: ${this.results.unitTests.total} (成功: ${this.results.unitTests.passed}, 失敗: ${this.results.unitTests.failed})`
    )
    console.log(
      `統合テスト: ${this.results.integrationTests.total} (成功: ${this.results.integrationTests.passed}, 失敗: ${this.results.integrationTests.failed})`
    )
    console.log(
      `E2Eテスト: ${this.results.e2eTests.total} (成功: ${this.results.e2eTests.passed}, 失敗: ${this.results.e2eTests.failed})`
    )
    console.log(
      `エラーハンドリングテスト: ${this.results.errorHandlingTests.total} (成功: ${this.results.errorHandlingTests.passed}, 失敗: ${this.results.errorHandlingTests.failed})`
    )
  }
}

if (require.main === module) {
  const collector = new TestResultCollector()
  collector.run().catch(console.error)
}

module.exports = TestResultCollector
