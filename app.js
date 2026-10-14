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
        { id: 'ph5', name: 'الفصل الخامس إلى الثامن: الفيزياء الحديثة' }
    ]
};

// القوانين والمثلثات الذهبية مكتوبة باللغة العربية والرموز الطبيعية المألوفة للمنهج المصري
const formulasData = {
    chem: [
        { title: 'عدد المولات والكتلة', top: 'الكتلة (جرام)', left: 'عدد المولات (مول)', right: 'الكتلة المولية (جم/مول)' },
        { title: 'تركيز المحاليل (المولارية)', top: 'عدد المولات (مول)', left: 'التركيز المولي (مول/لتر)', right: 'حجم المحلول (لتر)' },
        { title: 'قانون فاراداي للترسيب', top: 'الكتلة المترسبة (جم)', left: 'شدة التيار × الزمن × المكافئة', right: '96500 كولوم' }
    ],
    phys: [
        { title: 'قانون أوم (فرق الجهد)', top: 'فرق الجهد (فولت)', left: 'شدة التيار (أمبير)', right: 'المقاومة (أوم)' },
        { title: 'المفاعلة الحثية للملف', top: 'المفاعلة الحثية (أوم)', left: 'التردد (هيرتز)', right: 'معامل الحث (هنري)' },
        { title: 'القدرة الكهربية المستهلكة', top: 'القدرة (وات / جول/ثانية)', left: 'فرق الجهد (فولت)', right: 'شدة التيار (أمبير)' }
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

// عرض المثلثات الذهبية بشكل هندسي وواضح تماماً
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
                        <span style="color: var(--primary);">|</span>
                        <span>${f.right}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

// تحليل الربط وعرض المسائل الخطوات والحلول الواضحة
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

    resultContent.innerHTML = `<p style="color: var(--primary);">⏳ جاري استخراج المسائل وأفكار الامتحانات المشتركة...</p>`;

    setTimeout(() => {
        if (currentSubject === 'chem') {
            resultContent.innerHTML = `
                <h4 style="color: var(--primary); margin-bottom: 10px;">🔗 الربط المشترك بين (${b1Text}) و (${b2Text}):</h4>
                <p style="margin-bottom: 12px; font-size: 0.95rem;">يتم دمج حسابات التركيز والمولات من التحليل الكيميائي مع قوانين الكتلة المترسبة في الخلايا الكهربية.</p>
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 15px;">
                    <h4 style="color: var(--accent); margin-bottom: 6px;">⚗️ مسألة امتحان سابقة (1):</h4>
                    <p style="font-weight: 600; margin-bottom: 8px;">"أُمرّ تيار شدته 5 أمبير في مرسب كهروبي لمدة 1930 ثانية فزاد الكاثود 2.7 جرام، احسب تكافؤ الفلز علما بأن كتلته الذرية = 27."</p>
                    <p style="color: var(--primary); font-size: 0.9rem;"><strong>خطوات الحل:</strong> الكتلة المترسبة = (الشدة × الزمن × الكتلة المكافئة) ÷ 96500. ومنها نحسب التكافؤ ليساوي 3.</p>
                </div>
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <h4 style="color: var(--accent); margin-bottom: 6px;">⚗️ مسألة امتحان سابقة (2):</h4>
                    <p style="font-weight: 600; margin-bottom: 8px;">"احسب كتلة هيدروكسيد الصوديوم اللازمة لإتعادل مع 50 مللتر من حمض الهيدروكلوريك تركيزه 0.1 مولر."</p>
                    <p style="color: var(--primary); font-size: 0.9rem;"><strong>خطوات الحل:</strong> من قانون المعايرة ($M_a V_a / n_a = M_b V_b / n_b$) نحسب عدد المولات ثم نضربها في الكتلة المولية لتكون النتيجة 0.2 جرام.</p>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <h4 style="color: var(--primary); margin-bottom: 10px;">🔗 الربط المشترك بين (${b1Text}) و (${b2Text}):</h4>
                <p style="margin-bottom: 12px; font-size: 0.95rem;">يتم دمج قوانين كيرشوف وشبكات التيار مع حسابات دوائر التيار المتردد ($R-L-C$).</p>
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 15px;">
                    <h4 style="color: var(--accent); margin-bottom: 6px;">⚡ مسألة امتحان سابقة (1):</h4>
                    <p style="font-weight: 600; margin-bottom: 8px;">"ملف حث مهمل المقاومة الأومية حثه الذاتي 0.2 هنري متصل بمصدر متردد تردده 50 هيرتز وقيمته 200 فولت، احسب المفاعلة الحثية وشدة التيار."</p>
                    <p style="color: var(--primary); font-size: 0.9rem;"><strong>خطوات الحل:</strong> المفاعلة الحثية = $2 \times \pi \times f \times L = 62.83$ أوم. التيار = $200 \div 62.83 = 3.18$ أمبير.</p>
                </div>
                <div style="background: var(--bg-color); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <h4 style="color: var(--accent); margin-bottom: 6px;">⚡ مسألة امتحان سابقة (2):</h4>
                    <p style="font-weight: 600; margin-bottom: 8px;">"في دائرة كيرشوف المغلقة، إذا كانت القوة الدافعة للبطارية 12 فولت ومقاومتها الداخلية 1 أوم، ومقاومة الدائرة الخارجية 5 أوم، فما هي شدة التيار المار؟"</p>
                    <p style="color: var(--primary); font-size: 0.9rem;"><strong>خطوات الحل:</strong> التيار = القوة الدافعة ÷ (المقاومة الخارجية + المقاومة الداخلية) = $12 \div (5 + 1) = 2$ أمبير.</p>
                </div>
            `;
        }
    }, 1000);
});

function loadQuickLaw() {
    const box = document.getElementById('aiResult');
    box.classList.remove('hidden');
    box.innerHTML = `<h4 style="color: var(--primary);">📌 القوانين والمثلثات الذهبية معروضة بشكل منظم بالكامل في الأسفل تحت أداة الربط.</h4>`;
}

function loadPastExam() {
    const box = document.getElementById('aiResult');
    box.classList.remove('hidden');
    box.innerHTML = `<h4 style="color: var(--accent);">📚 جميع الأسئلة والمسائل مأخوذة مباشرة من أحدث كتب الامتحانات وكتيب المفاهيم.</h4>`;
}
