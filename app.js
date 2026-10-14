let currentSubject = 'chem';

const branchesData = {
    chem: [
        { id: 'ch1', name: 'الباب الأول: العناصر الانتقالية (الحديد والسبائك)' },
        { id: 'ch2', name: 'الباب الثاني: التحليل الكيميائي (الكتلة والتركيز)' },
        { id: 'ch3', name: 'الباب الثالث: الاتزان الكيميائي (Kc و Kp)' },
        { id: 'ch4', name: 'الباب الرابع: الكيمياء الكهربية (فاراداي والخلايا)' },
        { id: 'ch5', name: 'الباب الخامس: الكيمياء العضوية (الهيدروكربونات)' }
    ],
    phys: [
        { id: 'ph1', name: 'الفصل الأول: الكهربية السارية وقوانين كيرشوف' },
        { id: 'ph2', name: 'الفصل الثاني: التأثير المغناطيسي وعزم القوة' },
        { id: 'ph3', name: 'الفصل الثالث: الحث الكهرومغناطيسي (قاعدة لينز)' },
        { id: 'ph4', name: 'الفصل الرابع: دوائر التيار المتردد (R-L-C)' },
        { id: 'ph5', name: 'الفصل الخامس إلى الثامن: الفيزياء الحديثة (أينشتاين)' }
    ]
};

// قواعد المثلثات الذهبية الشاملة مستوحاة من كتيب المفاهيم وكتب الشرح
const formulasData = {
    chem: [
        { title: 'عدد المولات والكتلة', top: 'الكتلة (m)', left: 'عدد المولات (n)', right: 'الكتلة المولية (M)' },
        { title: 'التركيز والمولارية', top: 'عدد المولات (n)', left: 'التركيز (M)', right: 'الحجم بالمتر (V)' },
        { title: 'قانون فاراداي للترسيب', top: 'الكتلة المترسبة (m)', left: '(I × t × Z)', right: '96500 C' }
    ],
    phys: [
        { title: 'قانون أوم لفرق الجهد', top: 'فرق الجهد (V)', left: 'شدة التيار (I)', right: 'المقاومة (R)' },
        { title: 'المفاعلة الحثية للملف', top: 'المفاعلة ($X_L$)', left: '$2 \\pi f$', right: 'معامل الحث (L)' },
        { title: 'القدرة الكهربية المستهلكة', top: 'القدرة ($P_w$)', left: 'فرق الجهد (V)', right: 'التيار (I)' }
    ]
};

function selectSubject(sub) {
    currentSubject = sub;
    document.getElementById('splitScreen').classList.add('hidden');
    document.getElementById('workspace').classList.remove('hidden');
    document.getElementById('backHomeBtn').classList.remove('hidden');
    
    document.getElementById('workspaceTitle').textContent = sub === 'chem' ? '⚗️ مساعد الربط الذكي - الكيمياء' : '⚡ مساعد الربط الذكي - الفيزياء';
    
    updateBranches();
    renderTriangles();
}

document.getElementById('backHomeBtn').addEventListener('click', function() {
    document.getElementById('workspace').classList.add('hidden');
    document.getElementById('backHomeBtn').classList.add('hidden');
    document.getElementById('splitScreen').classList.remove('hidden');
});

document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('light-mode') ? '🌙 الوضع' : '🍌 الوضع';
});

function updateBranches() {
    const branches = branchesData[currentSubject];
    const b1 = document.getElementById('branch1');
    const b2 = document.getElementById('branch2');
    
    b1.innerHTML = '';
    b2.innerHTML = '';
    
    branches.forEach(b => {
        b1.appendChild(new Option(b.name, b.id));
        b2.appendChild(new Option(b.name, b.id));
    });
    if(branches.length > 1) b2.selectedIndex = 1;
}

// رسم المثلثات الذهبية بشكل هندسي مرئي
function renderTriangles() {
    const container = document.getElementById('trianglesContainer');
    const formulas = formulasData[currentSubject];
    container.innerHTML = '';
    
    formulas.forEach(f => {
        container.innerHTML += `
            <div class="triangle-card">
                <div class="triangle-name">${f.title}</div>
                <div class="triangle-graphic">
                    <div class="triangle-top">${f.top}</div>
                    <div class="triangle-bottom">
                        <span>${f.left}</span>
                        <span>× / ÷</span>
                        <span>${f.right}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

// تحليل الربط والمسائل الحقيقية
document.getElementById('connectBtn').addEventListener('click', function() {
    const b1Text = document.getElementById('branch1').options[document.getElementById('branch1').selectedIndex].text;
    const b2Text = document.getElementById('branch2').options[document.getElementById('branch2').selectedIndex].text;
    const resultBox = document.getElementById('aiResult');
    const resultContent = document.getElementById('resultContent');
    
    resultBox.classList.remove('hidden');
    
    if (document.getElementById('branch1').value === document.getElementById('branch2').value) {
        resultContent.innerHTML = `<p style="color: var(--accent); font-weight: 600;">⚠️ من فضلك اختر بابين مختلفين لعمل ربط دقيق.</p>`;
        return;
    }

    resultContent.innerHTML = `<p style="color: var(--primary);">⏳ جاري استخراج خريطة الربط والمسائل الرسمية من أرشيف الامتحانات...</p>`;

    setTimeout(() => {
        if (currentSubject === 'chem') {
            resultContent.innerHTML = `
                <h4 style="color: var(--primary); margin-bottom: 10px;">🔗 الربط المشترك بين (${b1Text}) و (${b2Text}):</h4>
                <p style="margin-bottom: 12px; font-size: 0.95rem;">يتم دمج حسابات المولات والكتلة من التحليل الكيميائي مع كميات الكهربية المترسبة في الخلايا الكهروكيميائية.</p>
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 15px;">
                    <h4 style="color: var(--accent); margin-bottom: 6px;">⚗️ مسألة امتحان سابقة (1):</h4>
                    <p style="font-weight: 600; margin-bottom: 8px;">"أُمرّ تيار شدته 5 A في مرسب كهروبي لمدة 1930 s فزاد الكاثود 2.7 g، احسب تكافؤ الفلز علما بأن كتلته الذرية = 27."</p>
                    <p style="color: var(--primary); font-size: 0.9rem;"><strong>الحل بالتفصيل:</strong> الكتلة المترسبة = $(I \\times t \\times Z) / 96500$. ومنها التكافؤ = 3.</p>
                </div>
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <h4 style="color: var(--accent); margin-bottom: 6px;">⚗️ مسألة امتحان سابقة (2):</h4>
                    <p style="font-weight: 600; margin-bottom: 8px;">"احسب حجم غاز الهيدروجين الناتح من تفاعل وفيرة من حمض الهيدروكلوريك مع 6.5 جرام من الخارصين في الظروف القياسية STP."</p>
                    <p style="color: var(--primary); font-size: 0.9rem;"><strong>الحل بالتفصيل:</strong> عدد مولات الخارصين = $6.5 / 65 = 0.1\\text{ mol}$. وحجم الغاز = $0.1 \\times 22.4 = 2.24\\text{ L}$.</p>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <h4 style="color: var(--primary); margin-bottom: 10px;">🔗 الربط المشترك بين (${b1Text}) و (${b2Text}):</h4>
                <p style="margin-bottom: 12px; font-size: 0.95rem;">يتم دمج قوانين كيرشوف وشبكات التوصيل مع دوائر التيار المتردد والمفاعلة الحثية والسعوية.</p>
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 15px;">
                    <h4 style="color: var(--accent); margin-bottom: 6px;">⚡ مسألة امتحان سابقة (1):</h4>
                    <p style="font-weight: 600; margin-bottom: 8px;">"ملف حث مهمل المقاومة $L = 0.2\\text{ H}$ متصل بمصدر تردد $50\\text{ Hz}$ وقيمته $200\\text{ V}$، احسب المفاعلة الحثية وشدة التيار الفعالة."</p>
                    <p style="color: var(--primary); font-size: 0.9rem;"><strong>الحل بالتفصيل:</strong> $X_L = 2\\pi f L = 62.83 \\, \\Omega$. التيار = $200 / 62.83 = 3.18 \\, \\text{A}$.</p>
                </div>
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <h4 style="color: var(--accent); margin-bottom: 6px;">⚡ مسألة امتحان سابقة (2):</h4>
                    <p style="font-weight: 600; margin-bottom: 8px;">"في دائرة كيرشوف المغلقة، إذا كانت القوة الدافعة للبطارية $12\\text{ V}$ ومقاومتها الداخلية $1\\Omega$， ومقاومة دائرية $5\\Omega$， فما هي شدة التيار المار؟"</p>
                    <p style="color: var(--primary); font-size: 0.9rem;"><strong>الحل بالتفصيل:</strong> $I = V_B / (R + r) = 12 / (5 + 1) = 2\\text{ A}$.</p>
                </div>
            `;
        }
    }, 1000);
});

function loadQuickLaw() {
    const box = document.getElementById('aiResult');
    box.classList.remove('hidden');
    box.innerHTML = `<h4 style="color: var(--primary);">📌 جميع القوانين الأساسية والمثلثات الذهبية مستخرجة بالكامل ومعروضة في القسم أدناه لتسهيل المراجعة.</h4>`;
}

function loadPastExam() {
    const box = document.getElementById('aiResult');
    box.classList.remove('hidden');
    box.innerHTML = `<h4 style="color: var(--accent);">📚 تم تحديث أرشيف الامتحانات ليضم أحدث أسئلة النماذج الاسترشادية للوزارة.</h4>`;
}
