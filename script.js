function baixarRotulo() {
    const original = document.getElementById('rotulo');
    const clone = original.cloneNode(true);
    clone.classList.add('light-mode');

    // Oculta o selo no PNG se o checkbox estiver desmarcado
    const showSodio = document.getElementById('toggleSodio').checked;
    const cloneSelo = clone.querySelector('#seloAltoSodio');
    if (cloneSelo) cloneSelo.style.display = showSodio ? 'inline-flex' : 'none';

    // Remove a seção do checkbox e seu texto do clone
    const toggleWrapper = clone.querySelector('.toggle-sodio');
    if (toggleWrapper && toggleWrapper.parentNode) {
        toggleWrapper.parentNode.removeChild(toggleWrapper);
    }

    // Substitui inputs por spans
    clone.querySelectorAll('input[type="text"]').forEach(input => {
        const span = document.createElement('span');
        const style = window.getComputedStyle(input);
        span.innerText = input.value;
        span.style.fontFamily = style.fontFamily;
        span.style.fontSize = style.fontSize;
        span.style.fontWeight = style.fontWeight;
        span.style.color = "#fff";
        span.style.textAlign = style.textAlign;
        span.style.display = "inline-block";

        if (input.parentElement.classList.contains('titulo-prato')) {
            span.style.fontSize = '64px';
            span.style.marginBottom = '2px';
            span.style.fontFamily = "'Great Vibes', cursive";
            span.style.color = '#fff';
            span.style.textShadow = '2px 2px 6px #000, 0 0 2px #fff';
        } else if (input.parentElement.classList.contains('subtitulo')) {
            span.style.fontSize = '32px';
            span.style.fontFamily = "'Great Vibes', cursive";
            span.style.color = '#fff';
            span.style.textShadow = '2px 2px 6px #000, 0 0 2px #fff';
        }

        input.parentNode.replaceChild(span, input);
    });

    // Substitui textareas por spans com quebra de linha
    clone.querySelectorAll('textarea').forEach(textarea => {
        const span = document.createElement('span');
        const style = window.getComputedStyle(textarea);
        span.innerHTML = textarea.value.replace(/\n/g, '<br>');
        span.style.fontFamily = style.fontFamily;
        span.style.fontSize = style.fontSize;
        span.style.fontWeight = style.fontWeight;
        span.style.color = "#fff";
        span.style.textAlign = style.textAlign;
        span.style.display = "inline-block";
        textarea.parentNode.replaceChild(span, textarea);
    });

    // Ajusta estilo das células da tabela
    clone.querySelectorAll('td, th').forEach(cell => {
        cell.style.color = '#fff';
        cell.style.fontWeight = 'bold';
    });

    // Remove estilos modernos do clone para o PNG
    clone.style.background = 'black';
    clone.style.boxShadow = 'none';
    clone.style.borderRadius = '0';
    clone.style.border = '2px solid #fff';
    clone.style.padding = '10px';
    clone.style.width = getComputedStyle(original).width;
    clone.style.height = 'auto';
    clone.style.display = 'block';
    clone.style.overflow = 'visible';

    // Remove classes modernas dos cards
    clone.querySelectorAll('.card').forEach(card => {
        card.style.background = 'black';
        card.style.boxShadow = 'none';
        card.style.borderRadius = '0';
        card.style.border = '1px solid #fff';
        card.style.padding = '10px';
    });
    // Remove estilos modernos da tabela
    clone.querySelectorAll('table').forEach(table => {
        table.style.background = 'black';
        table.style.boxShadow = 'none';
        table.style.borderRadius = '0';
        table.style.border = '1px solid #fff';
    });
    clone.querySelectorAll('th, td').forEach(cell => {
        cell.style.background = 'black';
        cell.style.color = '#fff';
        cell.style.fontWeight = 'bold';
        cell.style.border = '1px solid #fff';
    });

    // Prepara clone para renderização fora da tela
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.top = '-10000px';
    wrapper.style.left = '0';
    wrapper.style.backgroundColor = 'transparent';
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Ajuste final do tamanho e renderização
    clone.style.width = getComputedStyle(original).width;
    clone.style.height = 'auto';
    clone.style.display = 'block';
    clone.style.overflow = 'visible';

    document.fonts.ready.then(() => {
        html2canvas(clone, {
            backgroundColor: null,
            scale: 2,
            scrollY: 0,
            scrollX: 0,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'rotulo.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            document.body.removeChild(wrapper);
        });
    });
}