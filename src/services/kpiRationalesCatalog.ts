import type { KPIJustification } from '../types/kpiPlatform';

export type RationaleGenerator = (j: KPIJustification) => string;

export const KPI_RATIONALES: Record<string, Record<string, RationaleGenerator | string>> = {
  en: {},
  zh: {
    "Release Quality Index & Executive Evaluation": (j) => {
      const isBlocked = j.statusBadge.includes('Gated') || j.statusBadge.includes('阻断');
      const isWarn = j.statusBadge.includes('Warning') || j.statusBadge.includes('警告');
      if (isBlocked) {
        return `评级 ${j.currentValue} 与“已阻断 / 门禁拦截”状态被触发，原因为代码库中当前存在未关闭的发布阻断缺陷或客户缺陷逃逸率偏高。企业发布治理规范强制要求：凡存在未解决的 P1 致命缺陷或逃逸率威胁生产稳定性时，系统将自动触发硬性发布中止。`;
      }
      if (isWarn) {
        return `评级 ${j.currentValue} 代表“有条件警告”。尽管目前不存在硬性 P1 阻塞项，但有一项或多项关键质量指标（如自动化测试覆盖率或回归测试周期时长）略微偏离了目标门禁基准。`;
      }
      return `评级 ${j.currentValue} 代表完全符合“批准发布”规范。代码库零未解决发布阻断缺陷，回归执行速度敏捷高效，客户缺陷逃逸率完全受控于企业安全阈值之内。`;
    },
    "Blocking / Gating Defects": (j) => {
      const valStr = String(j.currentValue ?? '');
      const hasBlockers = valStr !== '0 Blockers' && !valStr.startsWith('0');
      return hasBlockers
        ? `当前检测到 ${valStr} 个尚未解决的发布门禁致命缺陷。企业发布管理规范明确要求：在投产部署前，阻断性工单数量必须彻底清零，否则严禁放行。`
        : '当前系统中不存在任何未解决的发布阻断缺陷。所有高优先级验收标准均已验证通过，门禁准入放行。';
    },
    "Defect Leakage (Customer APARs)": (j) => {
      const isHigh = j.statusColor === 'rose' || j.statusColor === 'amber';
      return isHigh
        ? `客户缺陷逃逸率为 ${j.currentValue}，已超出企业安全目标 (< 3.0%)。生产环境出现的逃逸缺陷表明发布前的回归测试套件存在覆盖漏洞或集成验证盲区。`
        : `当前客户缺陷逃逸率为 ${j.currentValue}，严格受控于企业安全阈值 (< 3.0%) 以内，验证了发布前测试流程的严密拦截成效。`;
    },
    "Mean Time to Resolve (MTTR)": (j) => {
      return `当前平均缺陷修复时长为 ${j.currentValue}。持续缩短 MTTR 能够显著减少跨团队交付等待，避免未修复缺陷在分支中积压并保障敏捷迭代节奏。`;
    },
    "Items With No Unit Tests": (j) => {
      const count = j.currentValue;
      return `当前主分支中存在 ${count} 个缺乏单元测试覆盖的代码合并工单。未受单元测试保护的代码改动容易在后续迭代重构中诱发隐蔽的逻辑回归。`;
    },
    "Automated Test Suite Pass Rate": (j) => {
      return `自动化测试套件当前总体通过率为 ${j.currentValue}。保持高通过率能确保 CI/CD 持续交付流水线的可靠性，并赋予团队快速迭代发布的信心。`;
    },
    "Flaky Test Detection Index": (j) => {
      return `当前不稳定测试占比为 ${j.currentValue}。非确定性失败会增加团队无谓的构建重试排查成本，必须及时将不稳定用例移入隔离观察队列并彻底修复。`;
    },
    "Over-Committed Engineers": (j) => {
      return `当前有 ${j.currentValue} 位测试工程师承担了超出健康负荷上限的工作量。合理再平衡团队用例分配能有效防止测试遗漏并避免团队工作倦怠。`;
    },
    "Enterprise Quality SLA Adherence": (j) => {
      return `企业级复合质量 SLA 履约达标率为 ${j.currentValue}，覆盖缺陷定级、全量回归执行、测试计划与客户热修等核心运营服务承诺。`;
    },
    "Cost of Poor Quality (CoPQ) & Rework Impact": (j) => {
      return `因缺陷排查修复和客户热修造成的估算返工损耗成本为 ${j.currentValue}。持续通过自动化测试将质量左移能够直接降低企业研发运营支出。`;
    },
    "DORA Change Failure Rate (CFR)": (j) => {
      return `当前变更失败率为 ${j.currentValue}。保持极低的服务变更回滚率是 Google DORA 精英级效能团队的核心标志，保障了业务连续性。`;
    },
    "Sprint Predictability Index (SPI)": (j) => {
      return `当前敏捷迭代交付可预测性指数为 ${j.currentValue}。高预测性能够确保团队按承诺兑现业务需求，助力管理层进行精准的路线图规划。`;
    },
    "Regression Cycle Time": (j) => {
      return `全量回归测试套件当前执行耗时为 ${j.currentValue}。保持敏捷紧凑的回归周期允许研发团队持续部署修复，无需经历数天的封版冻结。`;
    },
    "Performance P95 Latency Benchmark": (j) => {
      return `系统 P95 接口响应延迟当前为 ${j.currentValue}。95% 的合成与并发压测请求均在此延迟包络线内完成，保障了流畅的用户交互体验。`;
    },
    "Feature Lead Time (Commit-to-Customer)": (j) => {
      return `新功能从首行代码提交到生产可用平均需要 ${j.currentValue}。短前置时间有助于敏捷响应市场变化并建立极速的客户反馈循环。`;
    },
    "Security Gate Vulnerabilities & CVE Compliance": (j) => {
      return `当前发布版本中检测到 ${j.currentValue} 个高危安全漏洞。严格遵循 CISO 门禁策略，确保所有已知安全漏洞在上线前完成修复封堵。`;
    },
    "Contractual Production SLA Uptime": (j) => {
      return `当前生产环境服务复合可用率为 ${j.currentValue}，充分满足面向高价值企业客户的高可用性服务等级承诺。`;
    },
    "WCAG 2.2 AA Accessibility Compliance": (j) => {
      return `axe-core 自动化无障碍合规审计得分为 ${j.currentValue}，符合国际通用无障碍标准与公共服务准入规范。`;
    },
    "Test Execution Burnout & Predictive Velocity Forecast": (j) => {
      return `当前测试执行进度为 ${j.currentValue}。基于当前执行速率模型推演，测试进度保持在健康交付跑道之内，确保在发布节点前完成全量验证。`;
    },
    "Test Automation Burnout & Predictive Velocity Forecast": (j) => {
      return `当前自动化开发推进速率为 ${j.currentValue}。数学推导模型持续预测何时达成 100% 自动化，确保团队稳步消除手工测试瓶颈。`;
    }
  }
};
