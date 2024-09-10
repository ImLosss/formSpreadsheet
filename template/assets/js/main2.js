$('#btnSubmit').on('click', function () {
    if ($('#nama').val() == "" || $('#pendidikan').val() == "" || $('#tahun_ijazah').val() == "" || $('#usia')
        .val() == "" || $('#no_telfon_aktif').val() == "" || $('#email').val() == "" || $('#pengalaman_kerja')
        .val() == "" || $('#ska_skk').val() == "" || $('#sertifikat')
        .val() == "" || $('#jabatan_tarakhir').val() == "") {
        alert('Mohon lengkapi form');
    } else {
        var formdata = $('#myForm').serializeArray()

        if (Object.keys(sertifikat).length != 0) {
            formdata.push({
                name: 'sertifikat',
                value: sertifikat
            })
        }

        if (Object.keys(cv).length != 0) {
            formdata.push({
                name: 'cv',
                value: cv
            })
        }

        if (Object.keys(ska_skk).length != 0) {
            formdata.push({
                name: 'upload_ska_skk',
                value: ska_skk
            })
        }

        Swal.fire({
            title: "Loading...",
            html: "Data kamu sedang dikirim, mohon menunggu.",
            allowOutsideClick: false, // Prevent closing by clicking outside the alert
            didOpen: () => {
                Swal.showLoading(); // Menampilkan animasi loading
            }
        });

        fetch("https://script.google.com/macros/s/AKfycbypxWQ_dujtK2CHxS0ynrUDUkOvOKIjtTk6F1EXrwmgtr08c_TaZ9lbfPExREPE0-XV/exec", {
            method: "POST",
            body: JSON.stringify(formdata)
        })
        .then(r => r.text())
        .then(data => {
            Swal.close();

            if (data == "Berhasil upload") {
                document.getElementById("myForm").reset()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Data kamu berhasil dikirim!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                console.log(data);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Terjadi kesalahan saat mengirim data kamu, hubungi kami!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
});

var sertifikat = {},
    file, sertifikatReader = new FileReader();
sertifikatReader.onloadend = function (e) {
    sertifikat.data = e.target.result
    sertifikat.name = file.name
    console.log(sertifikat)
};
$('#sertifikat_pelatihan').change(function () {
    file = $('#sertifikat_pelatihan')[0].files[0]
    sertifikatReader.readAsDataURL(file);
})

var cv = {},
    file2, cvReader = new FileReader();
cvReader.onloadend = function (e) {
    cv.data = e.target.result
    cv.name = file2.name
    console.log(cv)
};
$('#upload_dokumen_cv').change(function () {
    file2 = $('#upload_dokumen_cv')[0].files[0]
    cvReader.readAsDataURL(file2);
})

var ska_skk = {},
    file3, ska_skkReader = new FileReader();
ska_skkReader.onloadend = function (e) {
    ska_skk.data = e.target.result
    ska_skk.name = file3.name
    console.log(ska_skk)
};
$('#upload_ska_skk').change(function () {
    file3 = $('#upload_ska_skk')[0].files[0]
    ska_skkReader.readAsDataURL(file3);
})