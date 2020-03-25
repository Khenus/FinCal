package com.example.fincal.SQLHelper;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import java.lang.reflect.Array;
import java.util.Calendar;

public class DatabaseHelper extends SQLiteOpenHelper {
    private static String tableName = "allExpensesEntries";
    private static String tableNamePMStats = "perMonthStats";
    private String col1 = "type";
    private String col2 = "description";
    private String col3 = "amount";
    private String col4 = "createdAt";
    private String pm1 = "allowance";
    private String pm2 = "amtSpent";
    private String pm3 = "amtLeft";
    private String pm4 = "month";

    public DatabaseHelper(Context context){
        super(context, tableName, null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String createTableMain = "CREATE TABLE IF NOT EXISTS " + tableName + "(id INTEGER PRIMARY KEY AUTOINCREMENT, " + col1 + " TEXT, " + col2 + " TEXT, " + col3 + " TEXT, " + col4 + " TEXT);";
        String createTablePerMonthStats = "CREATE TABLE IF NOT EXISTS " + tableNamePMStats + "(id INTEGER PRIMARY KEY AUTOINCREMENT, " + pm1 + " TEXT, " + pm2 + " TEXT, " + pm3 + " TEXT, " + pm4 + " TEXT);";;
        db.execSQL(createTableMain);
        db.execSQL(createTablePerMonthStats);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + tableName);
        db.execSQL("DROP TABLE IF EXISTS " + tableNamePMStats);
        onCreate(db);
    }

    public Cursor fetchStatsData(){
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;

        String monthDate = year + "-" + month;
        String[] monthArr = {monthDate};

        SQLiteDatabase db = this.getWritableDatabase();
        Cursor data = db.rawQuery("SELECT * FROM " + tableNamePMStats + " WHERE " +  pm4 + "=?", monthArr);

        return data;
    }

    public Cursor getAllStatsEntry(){
        SQLiteDatabase db = this.getWritableDatabase();
        Cursor data = db.rawQuery("SELECT * FROM " + tableNamePMStats, null);
        return data;
    }

    public boolean addStatsEntry(){
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;

        String monthDate = year + "-" + month;

        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(pm1, 0); //Starts from 1, 0 is for id
        contentValues.put(pm2, 0);
        contentValues.put(pm3, 0);
        contentValues.put(pm4, monthDate);
        long result = db.insert(tableNamePMStats, null, contentValues);

        if(result == -1){
            return false;
        } else {
            return true;
        }
    }

    public boolean updateStatsData(String allowance, String amtSpent, String amtLeft){
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;

        String monthDate = year + "-" + month;
        long result;

        ContentValues contentValues = new ContentValues();

        SQLiteDatabase db = this.getWritableDatabase();

        contentValues.put(pm1, allowance); //Starts from 1, 0 is for id
        contentValues.put(pm2, amtSpent);
        contentValues.put(pm3, amtLeft);
        contentValues.put(pm4, monthDate);
        result = db.update(tableNamePMStats, contentValues, monthDate, null);


        if(result == -1){
            return false;
        } else {
            return true;
        }
    }

    public boolean addDataToMain(String typeIn, String desIn, String amtIn){
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);

        String allDate = year + "-" + month + "-" + day;

        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(col1, typeIn); //Starts from 1, 0 is for id
        contentValues.put(col2, desIn);
        contentValues.put(col3, amtIn);
        contentValues.put(col4, allDate);

        Log.i("Date is ", allDate);

        long result = db.insert(tableName, null, contentValues);

        if(result == -1){
            return false;
        } else {
            return true;
        }
    }

    public Cursor getDataAllEntries(){
        SQLiteDatabase db = this.getWritableDatabase();
        Cursor data = db.rawQuery("SELECT * FROM " + tableName, null);
        return data;
    }
}
