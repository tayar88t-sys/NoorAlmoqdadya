<?php
/**
 * API endpoint لعداد الزوار
 * Visitor Counter API Endpoint
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

// إرجاع العدد كـ plain text
echo $current_count;
?>
