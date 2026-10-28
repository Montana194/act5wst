<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HRController extends Controller
{
    //
     Public function payroll(Request $request)
    {
        $daysAbsent = $request -> daysAbsent;
       $employmenttype = $request->input('employmenttype');
        $positiontier   = $request->input('positiontier');
        $daysAbsent     = $request->input('daysAbsent');
        $minutesLate    = $request->input('minutesLate');
        $overtimeHours  = $request->input('overtimeHours');

        
        if ($employmenttype == 'COS')
        {
            $baseSalary = 18000;
            $sss        = 0;
            $philhealth = 0;
            $pagibig    = 0;
        } 
        else if ($employmenttype == 'Regular' && $positiontier == 'Junior') {
            $baseSalary = 25000;
            $sss        = 1125;
            $philhealth = 625;
            $pagibig    = 200;
        } 
        elseif ($employmenttype == 'Regular' && $positiontier == 'Senior') {
            $baseSalary = 40000;
            $sss        = 1800;
            $philhealth = 1000;
            $pagibig    = 200;
        } else {
            return response()->json([
                'error' => 'Invalid employmentType or positionTier.'
            ], 400);
        }

        
        $daysPresent     = 22 - $daysAbsent;
        $dailyRate       = $baseSalary / 22;
        $hourlyRate      = $dailyRate / 8;
        $lateDeduction   = ($hourlyRate / 60) * $minutesLate;
        $absentDeduction = $dailyRate * $daysAbsent;
        $overtimePay     = $overtimeHours * ($hourlyRate * 1.25);
        $grossPay = $baseSalary - $lateDeduction - $absentDeduction + $overtimePay;
        $totalDeductions = $sss + $philhealth + $pagibig;
        $netPay = $grossPay - $totalDeductions;

        return response()->json([
            'daysAbsent'      => $daysAbsent,
            'employmenttype'  => $employmenttype,
            'positiontier'    => $positiontier,
            'baseSalary'      => $baseSalary,
            'daysPresent'     => $daysPresent,
            'dailyRate'       => round($dailyRate, 2),
            'lateDeduction'   => round($lateDeduction, 2),
            'absentDeduction' => round($absentDeduction, 2),
            'overtimePay'     => round($overtimePay, 2),
            'grossPay'        => round($grossPay, 2),
            'sss'             => $sss,
            'philhealth'      => $philhealth,
            'pagibig'         => $pagibig,
            'totalDeductions' => $totalDeductions,
            'netPay'          => round($netPay, 2),
        ]);
    }
    
}
