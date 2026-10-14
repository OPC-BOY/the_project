// app.js - البرمجة التفاعلية ومنطق الذكاء الاصطناعي

document.getElementById('connectBtn').addEventListener('click', function() {
    const lesson1 = document.getElementById('lesson1').value;
    const lesson2 = document.getElementById('lesson2').value;
    
    const resultBox = document.getElementById('aiResult');
    const resultContent = document.getElementById('resultContent');

    // إظهار صندوق النتيجة مع رسالة تحميل تفاعلية
    resultBox.classList.remove('hidden');
    resultContent.innerHTML = `<p style="color: #38bdf8;">⏳ جاري تحليل الروابط المشتركة واستنتاج أسئلة الامتحانات بالذكاء الاصطناعي...</p>`;

    // محاكاة استجابة ذكية ومتقدمة (مبنية على أسلوب امتحانات الثانوية العامة)
    setTimeout(() => {
        if (lesson1 === lesson2) {
            resultContent.innerHTML = `<p style="color: #f43f5e;">⚠️ من فضلك اختر درسين مختلفين لنستكشف نقاط التقاطع بينهما.</p>`;
            return;
        }

        resultContent.innerHTML = `
            <h4 style="color: #38bdf8; margin-bottom: 10px;">🔗 نقاط الالتقاء والربط في امتحانات الثانوية العامة:</h4>
            <p><strong>1. الفكرة المشتركة:</strong> يتقاطع هذان المفهومان غالباً في أسئلة المستويات العليا (التفكير النقدي) لدمج قوانين البابين معاً.</p>
            <p style="margin-top: 8px;"><strong>2. تركاية الامتحان (Tricky Point):</strong> ركز على نقطة استنتاج العامل المشترك وتطبيق القوانين المتقاطعة (خصوصاً في مسائل التحويل والربط بين الدوائر والتفاعلات).</p>
            <p style="margin-top: 8px;"><strong>3. فكرة سؤال متوقع:</strong> "ما هو التأثير المتسلسل عند حدوث تغير في (${lesson1}) على النظام المرتبط بـ (${lesson2})؟"</p>
            <p style="margin-top: 10px; color: #a5f3fc; background: #1e293b; padding: 10px; border-radius: 6px;"><strong>💡 نصيحة مخصصّة:</strong> اربط دائماً بين الوحدات الفيزيائية والمعادلات الكيميائية ولا تكتفِ بالحفظ المنفصل.</p>
        `;
    }, 1200);
});