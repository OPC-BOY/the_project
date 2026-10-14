// بيانات الفروع بناءً على اختيار المادة
const branchesData = {
    chem: [
        { id: 'ch1', name: 'الباب الأول: العناصر الانتقالية' },
        { id: 'ch2', name: 'الباب الثاني: التحليل الكيميائي' },
        { id: 'ch3', name: 'الباب الثالث: الاتزان الكيميائي' },
        { id: 'ch4', name: 'الباب الرابع: الكيمياء الكهربية' },
        { id: 'ch5', name: 'الباب الخامس: الكيمياء العضوية' }
    ],
    phys: [
        { id: 'ph1', name: 'الفصل الأول: الكهربية السارية وقوانين كيرشوف' },
        { id: 'ph2', name: 'الفصل الثاني: التأثير المغناطيسي للتيار' },
        { id: 'ph3', name: 'الفصل الثالث: الحث الكهرومغناطيسي' },
        { id: 'ph4', name: 'الفصل الرابع: دوائر التيار المتردد' },
        { id: 'ph5', name: 'الفصل الخامس إلى الثامن: الفيزياء الحديثة' }
    ]
};

const subjectSelect = document.getElementById('subjectSelect');
const branch1Select = document.getElementById('branch1');
const branch2Select = document.getElementById('branch2');

// دالة لتعبئة قوائم الفروع بناءً على المادة المختارة
function updateBranches() {
    const selectedSubject = subjectSelect.value;
    const branches = branchesData[selectedSubject];
    
    branch1Select.innerHTML = '';
    branch2Select.innerHTML = '';
    
    branches.forEach((branch, index) => {
        let option1 = document.createElement('option');
        option1.value = branch.id;
        option1.textContent = branch.name;
        branch1Select.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = branch.id;
        option2.textContent = branch.name;
        branch2Select.appendChild(option2);
    });

    // جعل الفرع الثاني مختلف افتراضياً لتجنب التطابق
    if (branches.length > 1) {
        branch2Select.selectedIndex = 1;
    }
}

// تنفيذ التحديث عند تغيير المادة
subjectSelect.addEventListener('change', updateBranches);
// تشغيلها أول ما الصفحة تفتح
updateBranches();


// حدث الضغط على زر الربط الذكي
document.getElementById('connectBtn').addEventListener('click', function() {
    const sub = subjectSelect.value;
    const b1Text = branch1Select.options[branch1Select.selectedIndex].text;
    const b2Text = branch2Select.options[branch2Select.selectedIndex].text;
    
    const resultBox = document.getElementById('aiResult');
    const resultContent = document.getElementById('resultContent');

    if (branch1Select.value === branch2Select.value) {
        resultBox.classList.remove('hidden');
        resultContent.innerHTML = `<p style="color: #f43f5e;">⚠️ يرجى اختيار فرعين مختلفين لعمل ربط دقيق.</p>`;
        return;
    }

    resultBox.classList.remove('hidden');
    resultContent.innerHTML = `<p style="color: #38bdf8;">⏳ جارٍ استخراج خريطة الربط وأسئلة الامتحانات المرتبطة...</p>`;

    setTimeout(() => {
        resultContent.innerHTML = `
            <div style="margin-bottom: 15px;">
                <h4 style="color: #38bdf8;">🔗 شكل الربط الفني بين (${b1Text}) و (${b2Text}):</h4>
                <p style="margin-top: 5px; color: #cbd5e1;">التقاطع بين هذين البابين يعتمد على دمج القوانين الرياضية أو استنتاج الخواص العامة (مثل ربط معدلات التفاعل بالخلايا أو ربط الحث بقوانين الدوائر المغلقة).</p>
            </div>

            <div style="background: #090d16; padding: 15px; border-radius: 8px; border: 1px solid #334155;">
                <h4 style="color: #f43f5e; margin-bottom: 8px;">📝 سؤال امتحان سابق (تطبيق مباشر):</h4>
                <p style="font-weight: 600; margin-bottom: 10px;">"ما التغير الحادث في القراءة أو الناتج عند دمج مفاهيم البابين معاً في ظروف قياسية؟"</p>
                <p style="color: #38bdf8; font-size: 0.95rem;"><strong>الإجابة النموذجية:</strong> يتم حساب الناتج أولاً من فرع (${b1Text}) ثم يُعوض به في معادلة فرع (${b2Text}) للوصول للناتج النهائي.</p>
            </div>
        `;
    }, 1000);
});


// دوال تفاعلية للخانة الجانبية (القوانين والأسئلة)
function showLaw(type) {
    const resultBox = document.getElementById('aiResult');
    const resultContent = document.getElementById('resultContent');
    resultBox.classList.remove('hidden');
    
    if(type === 'chem') {
        resultContent.innerHTML = `
            <h4 style="color: #38bdf8;">📌 أهم قوانين الكيمياء:</h4>
            <p>1. قانون لوشاتليه (الاتزان الكيميائي).</p>
            <p>2. قانون فاراداي للتحليل الكهربي ($Q = I \times t$).</p>
        `;
    } else {
        resultContent.innerHTML = `
            <h4 style="color: #38bdf8;">📌 أهم قوانين الفيزياء:</h4>
            <p>1. قوانين كيرشوف الأول والثاني ($\sum I = 0, \sum V = 0$).</p>
            <p>2. قوة الطرد والحث المتبادل ($emf = -N \frac{\Delta \Phi_m}{\Delta t}$).</p>
        `;
    }
}

function showExam(type) {
    const resultBox = document.getElementById('aiResult');
    const resultContent = document.getElementById('resultContent');
    resultBox.classList.remove('hidden');
    
    resultContent.innerHTML = `
        <h4 style="color: #f43f5e;">📚 أرشيف امتحانات الثانوية العامة:</h4>
        <p>هذا السؤال تم تكراره في صيغ امتحانات الأعوام السابقة بنسبة عالية، ويعتمد على استنتاج العلاقة البيانية بين المتغيرين.</p>
    `;
}