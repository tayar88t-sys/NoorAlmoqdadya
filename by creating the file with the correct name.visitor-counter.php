<?php
/**
 * عداد الزوار لمدينة ألعاب نور المقدادية
 * Visitor Counter for Noor Al-Maqadasiya Games City
 */

// بدء الجلسة لتمييز الزائر
session_start();

// مسار ملف العداد
$counter_file = 'counter.txt';

// التحقق من وجود ملف العداد، إذا لا يوجد يتم إنشاؤه
if (!file_exists($counter_file)) {
    file_put_contents($counter_file, '0');
}

// قراءة القيمة الحالية من الملف
$current_count = (int) file_get_contents($counter_file);

// التحقق إذا كان الزائر قد سجل زيارة مسبقاً في هذه الجلسة
if (!isset($_SESSION['noor_visited'])) {
    // وضع علامة أنه زار
    $_SESSION['noor_visited'] = true;
    
    // زيادة العدد
    $current_count++;
    
    // حفظ القيمة الجديدة في الملف
    file_put_contents($counter_file, $current_count);
}

// دالة لعرض العدد مع تنسيق
function getVisitorCount() {
    global $current_count;
    return $current_count;
}
?>
